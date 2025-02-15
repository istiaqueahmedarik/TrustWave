import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers';
import { createMiddleware } from 'hono/factory';
import { ipRestriction, IPRestrictionRule } from 'hono/ip-restriction';
import { jwt, JwtVariables } from 'hono/jwt';
import { isbot } from 'isbot';
import postgres from 'postgres'

var jwt_ = require('jsonwebtoken')


type Variables = JwtVariables

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_ROLE_KEY: string
    TRUST: KVNamespace
}

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()


async function fetchBannedIPs(): Promise<IPRestrictionRule[]> {
    return ['192.168.1.100']
}




app.use(
    '*',
    ipRestriction(
        getConnInfo,
        {
            denyList: await fetchBannedIPs(),
        },
        async (remote, c) => {
            console.log(`Blocking access from ${remote.addr}`)
            return c.text(`Blocking access from ${remote.addr}`, 403)
        }
    )
)

app.use('*', createMiddleware(async (c, next) => {
    const info = getConnInfo(c)
    const ip = info.remote.address || ''
    let val = await c.env.TRUST.get(ip.toString())
    if (val) {
        const timeDiff = new Date().getTime() - new Date(val).getTime()
        console.log('timeDiff', timeDiff)
        const validTime = 1000 * 10
        if (timeDiff < validTime) {
            return c.text('Too many requests', 429)
        }
    }
    if (!val) {
        await c.env.TRUST.put(ip.toString(), new Date().toISOString())
    }
    // const bot = isbot(c.req.header('User-Agent'))
    // if (bot) {
    //     return c.text('Bot detected', 403)
    // }
    console.log(ip, val)
    await next()
}))







app.use('/auth/*', (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
    })
    return jwtMiddleware(c, next)
})

app.get('/auth', async (c) => {
    return c.text('Hello Hono!')
})


/**
 * 



 */


app.post('/auth/pay', async (c) => {
    const info = getConnInfo(c)
    const { phoneNumber, amount, reference } = await c.req.json();
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const user = await sql`SELECT * FROM "User"  WHERE "Phone_number" = ${phoneNumber as string}`
    console.log(user, phoneNumber, amount, reference)
    const payload = c.get('jwtPayload');
    const email = payload.email
    const sender = await sql`SELECT * FROM "User"  WHERE "email" = ${email}`
    if (user.length == 0) {
        return c.json({
            status: 'error',
            data: 'User not found'
        })
    }
    console.log(user, sender)
    const id = user[0].ID
    console.log(id, amount, reference, sender[0].ID)
    const res = await sql`INSERT INTO public.Transactions (user_id,amount, reference,sender_id,ip)
VALUES (${id}, ${amount},${reference}, ${sender[0].ID},${info.remote.address}) RETURNING *;`
    return c.json({
        status: 'success',
        data: res
    })
})






export default app