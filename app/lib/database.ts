import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_SECRET,
    database: process.env.DATABASE_SCHEMA,
});