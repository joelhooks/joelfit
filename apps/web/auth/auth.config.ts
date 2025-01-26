import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import NextAuth, { type NextAuthConfig, type DefaultSession, type Session, NextAuthResult } from 'next-auth'
import { db } from '@/db'
import { schema } from "@/db/schema"

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
			image: string
		} & DefaultSession["user"]
	}
}

export const authOptions: NextAuthConfig = {
	adapter: DrizzleAdapter(db, schema),
	providers: [Google],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
				image: user.image,
			},
		}),
	},
}

export const result = NextAuth(authOptions)

export const {GET, POST}: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;

export const getServerAuthSession = async (): Promise<Session | null> => {
	return await auth()
}

