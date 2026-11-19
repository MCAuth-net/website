import "server-only";
import { pool } from "@/app/lib/database";
import { Account, User } from "@/app/lib/types";

export async function verifyToken(value: string): Promise<User | null> {

    const result = await pool
        .query("SELECT uuid, token FROM logins WHERE token = $1",
            [value]
        );

    if (result.rows.length === 0) {

        return null;

    }

    const { uuid, token } = result.rows[0];

    return { uuid, token };

}

export async function createUser(user_email: string | null, password: string | null, user_uuid: string | null): Promise<Account | null> { // Add error codes tomorrow

    if (!user_email && !user_uuid) {

        return null;

    }

    if (!password) {

        return null;

    }

    const userCheck = await pool
        .query("SELECT 1 FROM accounts WHERE uuid = $1 OR email = $2 AND email NOT NULL AND uuid NOT NULL",
            [user_uuid, user_email]
        );

    if (userCheck.rows.length !== 0) {

        return null; // User exists

    }

    const createdUser = await pool
        .query("INSERT INTO accounts (uuid, email, password, registered) VALUES ($1, $2, $3, unixepoch()) RETURNING *",
            [user_uuid, user_email, password] // HASH THE PASSWORD
        );

    const { id, uuid, email, release } = createdUser.rows[0];

    return {
        id,
        uuid,
        email,
        release,
    }

}