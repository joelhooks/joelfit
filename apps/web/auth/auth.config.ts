import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import NextAuth, { type NextAuthConfig, type DefaultSession, type Session } from 'next-auth'
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

const nextAuth = NextAuth(authOptions)

export const { handlers: { GET, POST }, signIn } = nextAuth
export const auth = nextAuth.auth as () => Promise<Session | null>

export const getServerAuthSession = async () => {
	const session = await auth()

	return session
}

