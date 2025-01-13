import 'dotenv/config';
import { type Config } from 'drizzle-kit'

export default {
	schema: ['./src/db/schema.ts'],
	dialect: 'mysql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	tablesFilter: [`joelfit_*`],
	out: './src/db/generated',
} satisfies Config
