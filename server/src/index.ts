import { Hono } from 'hono'
import auth from './auth'
import payment from './payment'
import { JwtVariables } from 'hono/jwt'
import { getConnInfo } from 'hono/cloudflare-workers'
import { ipRestriction, IPRestrictionRule } from 'hono/ip-restriction'

type Variables = JwtVariables

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
  SUPABASE_URL: string,
  SUPABASE_SERVICE_ROLE_KEY: string
}


const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()


app.route('/', auth)
app.route('/payment', payment)



export default app