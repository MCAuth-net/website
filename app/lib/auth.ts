import "server-only";
import argon2, { HashOptions } from "argon2";
import { pool } from "@/app/lib/database";
import {Account, ServerResponse, User} from "@/app/lib/types";
import { createHash } from "crypto";

const options: HashOptions = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 4,
    parallelism: 2,
};

async function hash(tohash: string) {

    return argon2.hash(tohash, options);

}

function hashSha(token: string) {

    return createHash("sha256").update(token).digest("hex");

}

export async function verifyToken(token: string, uuid: string): Promise<ServerResponse> {

    const res = await fetch(`https://api.mcauth.net/v1/vefify-token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, uuid }),
    });

    if (!res.ok) {

        return {
            success: false,
            message: "Failed to reach backend server",
        }

    }

    const response = await res.json();

    if (!response.success) {

        return {
            success: false,
            message: "Token verification failed",
        }

    }

    return {
        success: true,
    }

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
            [user_uuid, user_email, hash(password)]
        );

    const { id, uuid, email, release } = createdUser.rows[0];

    return {
        id,
        uuid,
        email,
        release,
    }

}