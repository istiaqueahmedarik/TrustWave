import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers';
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

app.use('*', async (c, next) => {
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
})







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

app.post('/signup', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const body = await c.req.json();

    const { name, present_address, email, phone, password, dob, fathersName, mothersName, nid, permanentAddress, croppedImage, nidImage } = body;

    console.log('body', body)
    const findUser = await sql`SELECT * FROM "User" WHERE "nid" = ${nid}`
    if (findUser.length > 0) {
        return c.json({
            status: 'error',
            message: 'Donor already exists'
        })
    }

    try {
        const user = await sql`INSERT INTO "User" ("Full_name","email", "Address","Verification_url","Phone_number","Father's_name", "Mother's_name", "Date_of_birth", "Profile_picture","nid","present_address") VALUES (${name}, ${email}, ${permanentAddress}, ${nidImage},${phone}, ${fathersName}, ${mothersName}, ${new Date(dob).toISOString()}, ${croppedImage},${nid},${present_address}) RETURNING *`
        console.log('user', user)

        const user_id = user[0].ID


        const pass = await sql`INSERT INTO "Password" ("Password", "User_id") VALUES (${password}, ${user_id}) RETURNING *`


        return c.json({
            status: 'success',
            data: user[0]
        })
    }
    catch (e) {
        console.log('error', e)
        return c.json({
            status: 'error',
            message: e
        })
    }
})


app.post('/login', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const body = await c.req.json();

    const { email, password } = body;

    console.log(email, password)


    const user = await sql`SELECT * FROM "User"  WHERE "email" = ${email}`
    if (user.length) {

        const pass = await sql`SELECT * FROM "Password" WHERE "User_id" = ${user[0].ID}`

        console.log('pass', pass)

        if (pass[0].Password !== password) {
            return c.json({
                status: 'error',
                message: 'Password incorrect'
            })
        }
        const id = user[0].ID
        const payload = { email, id }
        const token = jwt_.sign(payload, c.env.JWT_SECRET, { expiresIn: '1d' })
        console.log('token', token)
        return c.json({
            status: 'success',
            token
        })
    }




    return c.json({
        status: 'error',
        message: 'User not found'
    })

})

app.get('/auth/type', async (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
        status: 'success',
        type: payload.type
    })
})

app.get('/', async (c) => {
    const info = getConnInfo(c)
    console.log(info.remote.address)
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    return c.text('Hello Hono!')
})








export default app