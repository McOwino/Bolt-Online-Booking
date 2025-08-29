import { createAuthClient } from "@better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:5173/api/auth",
})

export const {
  signUp,
  signIn,
  signOut,
  useSession,
} = authClient