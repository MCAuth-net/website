import type {Account} from "./types.ts";

export const requireUser = async () => {

    const user = await getUser();

    if (!user) location.href = "/auth";

    return user;

}

export const requireNoUser = async () => {

    const user = await getUser();

    if (user) location.href = "/dashboard";

}

export async function getUser() {

    const res = await fetch(`https://api.mcauth.net/v1/profile/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            accept: "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json() as Account;

}

export async function logout(): Promise<boolean> {

    const res = await fetch(`https://api.mcauth.net/v1/auth`, {
        method: "DELETE",
        credentials: "include",
    });

    return res.ok;

}