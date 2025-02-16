import { Hono } from 'hono'
import auth from './auth'
import payment from './payment'
import admin from './admin'
import { JwtVariables } from 'hono/jwt'
import { getConnInfo } from 'hono/cloudflare-workers'
import { ipRestriction, IPRestrictionRule } from 'hono/ip-restriction'
import { createMiddleware } from 'hono/factory'
import { isbot } from 'isbot'

type Variables = JwtVariables

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
  SUPABASE_URL: string,
  SUPABASE_SERVICE_ROLE_KEY: string
}


const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()

async function fetchBannedIPs(): Promise<IPRestrictionRule[]> {
  return ['203.194.117.91', '203.194.117.93', '203.194.117.94']
  // return []
}




// app.use(
//   '*',
//   ipRestriction(
//     getConnInfo,
//     {
//       denyList: await fetchBannedIPs(),
//     },
//     async (remote, c) => {
//       console.log(`Blocking access from ${remote.addr}`)
//       return c.text(`Blocking access from ${remote.addr}`, 403)
//     }
//   )
// )

// app.use('*', createMiddleware(async (c, next) => {
//   const info = getConnInfo(c)
//   const ip = info.remote.address || ''
//   let val = await c.env.TRUST.get(ip.toString())
//   if (val) {
//     const timeDiff = new Date().getTime() - new Date(val).getTime()
//     console.log('timeDiff', timeDiff)
//     const validTime = 1
//     if (timeDiff < validTime) {
//       return c.text('Too many requests', 429)
//     }
//   }
//   if (!val) {
//     await c.env.TRUST.put(ip.toString(), new Date().toISOString())
//   }
//   const bot = isbot(c.req.header('User-Agent'))
//   if (bot) {
//     return c.text('Bot detected', 403)
//   }
//   console.log(ip, val)
//   await next()
// }))


app.route('/', auth)
app.route('/payment', payment)
app.route('/admin', admin)



export default app