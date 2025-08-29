import { betterAuth } from "better-auth"
import { supabaseAdapter } from "better-auth/adapters/supabase"
import { supabase } from "./supabase"

const ALLOWED_DOMAINS = ['gmail.com', 'org.com']
const SUPER_ADMIN_EMAIL = 'owinovictor91@gmail.com'

export const auth = betterAuth({
  database: supabaseAdapter(supabase),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  hooks: {
    before: [
      {
        matcher(context) {
          return context.path === "/sign-up"
        },
        handler: async (ctx) => {
          const { email } = ctx.body as { email: string }
          const domain = email.split('@')[1]
          
          if (!ALLOWED_DOMAINS.includes(domain)) {
            throw new Error('Domain not allowed for registration')
          }
          
          return ctx
        },
      },
    ],
    after: [
      {
        matcher(context) {
          return context.path === "/sign-up"
        },
        handler: async (ctx) => {
          if (ctx.returned?.user) {
            const { user } = ctx.returned
            const role = user.email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'admin'
            const status = user.email === SUPER_ADMIN_EMAIL ? 'active' : 'pending_admin'
            
            await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                email: user.email,
                role,
                status,
              })
          }
          
          return ctx
        },
      },
    ],
  },
})

export type Session = typeof auth.$Infer.Session