import "server-only";
import argon2, { HashOptions } from "argon2";
import { Account, ServerResponse } from "@/app/lib/types";
import { createHash } from "crypto";
import {cache} from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

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

export const requireUser = cache(async () => {

    const token = (await cookies()).get("session")?.value;
    const user = token ? await getUser(token) : null;

    if (!user || "success" in user) redirect("/auth");

    return user;

});

export const requireNoUser = cache(async () => {

    const token = (await cookies()).get("session")?.value;
    const user = token ? await getUser(token) : null;

    if (user && !("success" in user)) redirect("/dashboard");

    return user;

});

export const getIfUser = cache(async () => {

    const token = (await cookies()).get("session")?.value;
    const user = token ? await getUser(token) : null;

    if (!user || "success" in user) return null;

    return user;

});

export async function getUser(token: string): Promise<ServerResponse | Account> {

    const res = await fetch(`https://api.mcauth.net/v1/profile/me`, {
        method: "GET",
        headers: {
            accept: "application/json",
            cookie: `session=${token}`,
        },
        cache: "no-store",
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
            message: "Not authenticated",
        }

    }

    try {

        const response = await res.json();

        return {
            id: response.id,
            email: response.email,
            uuid: response.uuids[0],
            session: token,
        }

    } catch (error) {

        return {
            success: false,
            message: "Not authenticated",
        }

    }

    try {

        const response = await res.json();

        return {
            id: response.id,
            email: response.email,
            uuid: response.uuid[1],
            session: token,
        }

    } catch (error) {

        return {
            success: false,
            message: "Not authenticated",
        }

    }

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