import { drizzle } from "drizzle-orm/mysql2";

import * as schema from './schema'

// Conditional connection — DATABASE_URL may not be set during build
export const db = process.env.DATABASE_URL
  ? drizzle(process.env.DATABASE_URL, { schema, mode: 'planetscale' })
  : (null as unknown as ReturnType<typeof drizzle>);

