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




// app.use(
//     '*',
//     ipRestriction(
//         getConnInfo,
//         {
//             denyList: await fetchBannedIPs(),
//         },
//         async (remote, c) => {
//             console.log(`Blocking access from ${remote.addr}`)
//             return c.text(`Blocking access from ${remote.addr}`, 403)
//         }
//     )
// )

// app.use('*', createMiddleware(async (c, next) => {
//     const info = getConnInfo(c)
//     const ip = info.remote.address || ''
//     let val = await c.env.TRUST.get(ip.toString())
//     if (val) {
//         const timeDiff = new Date().getTime() - new Date(val).getTime()
//         console.log('timeDiff', timeDiff)
//         const validTime = 1000 * 10
//         if (timeDiff < validTime) {
//             return c.text('Too many requests', 429)
//         }
//     }
//     if (!val) {
//         await c.env.TRUST.put(ip.toString(), new Date().toISOString())
//     }
//     const bot = isbot(c.req.header('User-Agent'))
//     if (bot) {
//         return c.text('Bot detected', 403)
//     }
//     console.log(ip, val)
//     await next()
// }))







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



app.get('/auth/user_list', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    console.log('connectionString', connectionString)
    const sql = postgres(connectionString)

    const { email } = c.get('jwtPayload')
    if (!email) {
        return c.json({ error: 'Unauthorized' }, 401)
    }
    const user =
        await sql`select * from public."User" where "email" = ${email} and type = 'admin'`
    if (user.length === 0) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    try {
        const result =
            await sql`select row_number() over() sl_no, t.*, us."Full_name" sender_name, ur."Full_name" receiver_name from transactions t
join "User" us on us."ID" = t.sender_id
join "User" ur on ur."ID" = t.user_id
order by created_at`

        return c.json({
            status: 'success',
            data: result,
        })
    } catch (e) {
        console.log('error', e)
        return c.json({
            status: 'error',
            message: e,
        })
    }
})


app.post('/auth/ban_user', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const { banIp } = await c.req.json();

    const res = await sql`INSERT INTO ip_tracink (ip_address) VALUES (${banIp})`
    return c.json({
        status: 'success',
        data: res
    })
})






export default app