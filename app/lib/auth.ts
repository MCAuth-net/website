import "server-only";
import argon2, { HashOptions } from "argon2";
import { Account, ServerResponse } from "@/app/lib/types";
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

    const res = await fetch(`https://api.mcauth.net/v1/verify-token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, uuid }),
    });

    if (res.status === 429) {

        return {
            success: false,
            message: `You are being rate limited!`,
        }

    }

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
            message: response.message,
        }

    }

    return {
        success: true,
    }

}

export async function createUser(user_email: string | null, password: string | null, user_uuid: string | null): Promise<Account | ServerResponse> {

    // General checks
    if (!user_uuid && !user_email) {

        return {
            success: false,
            message: "Not enough information provided",
        }

    }

    if (password && password.length < 8) {

        return {
            success: false,
            message: "Password is too short",
        }

    }

    // User check
    const userCheck = await fetch(`https://api.mcauth.net/v1/check-user`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_uuid }),
    });

    if (userCheck.status === 429) {

        return {
            success: false,
            message: `You are being rate limited!`,
        }

    }

    if (!userCheck.ok) {

        return {
            success: false,
            message: "Failed to reach backend server",
        }

    }

    const userResponse = await userCheck.json();

    if (!userResponse.success) {

        return {
            success: false,
            message: userResponse.message,
        }

    }

    // Registration
    const registration = await fetch(`https://api.mcauth.net/v1/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_uuid, user_email, password }),
    });

    if (registration.status === 429) {

        return {
            success: false,
            message: `You are being rate limited!`,
        }

    }

    if (!registration.ok) {

        return {
            success: false,
            message: "Failed to reach backend server",
        }

    }

    const registerResponse = await registration.json();

    if (!registerResponse.success) {

        return {
            success: false,
            message: registerResponse.message,
        }

    }

    return registerResponse as Account;

}