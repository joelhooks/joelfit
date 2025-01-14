import { drizzle } from "drizzle-orm/mysql2";

import * as schema from './schema'


export const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'planetscale' });

