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

app.get('/auth/all', async (c) => {
    const payload = c.get('jwtPayload');
    console.log(payload)
    const email = payload.email
    console.log(email)
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const user = await sql`SELECT * FROM "User"  WHERE "email" = ${email};`
    const id = user[0].ID
    const sent = await sql`SELECT SUM(amount) FROM public.Transactions WHERE sender_id = ${id};`
    const received = await sql`SELECT SUM(amount) FROM public.Transactions WHERE user_id = ${id};`
    const balance = received[0].sum - sent[0].sum

    const all_transactions = await sql`SELECT * FROM public.Transactions WHERE user_id = ${id};`
    return c.json({
        status: 'success',
        data: {
            sent: sent[0].sum,
            received: received[0].sum,
            balance: balance,
            all_transactions: all_transactions
        }
    })

})

app.get('/auth/leaderboard', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const res = await sql`SELECT user_id, COUNT(*) AS transaction_count
FROM public.transactions
GROUP BY user_id
ORDER BY transaction_count DESC;`
    return c.json({
        status: 'success',
        data: res
    })
})

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
VALUES (${id}, ${amount},${reference}, ${sender[0].ID},${info.remote.address ?? ''}) RETURNING *;`
    return c.json({
        status: 'success',
        data: res
    })
})






export default app