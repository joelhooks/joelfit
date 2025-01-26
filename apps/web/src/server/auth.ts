import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import NextAuth, { type NextAuthConfig, type DefaultSession, Session} from 'next-auth'

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

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth(authOptions)

export const getServerAuthSession = async (): Promise<Session | null> => {
	return await auth()
}