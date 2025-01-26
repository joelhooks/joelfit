import { authOptions } from '@/server/auth'
import NextAuth from 'next-auth'

export const {
	auth,
	handlers,
	signIn,
	signOut,
} = NextAuth(authOptions)

export const GET = handlers.GET
export const POST = handlers.POST