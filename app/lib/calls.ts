import type {Account} from "./types.ts";

export const requireUser = async () => {

    const user = await getUser();

    if (!user) location.href = "/auth";

    return user;

}

export const getIfUser = async () => {

    const user = await getUser();

    return user;

}

export const requireNoUser = async () => {

    const user = await getUser();

    if (user) location.href = "/dashboard";

}

export async function getUser(): Promise<Account | null> {

    if (process.env.NEXT_PUBLIC_PRODUCTION === "false") return {
        displayName: null,
        email: null,
        id: 1,
        name: "Polokalap",
        uuid: "5248a0e1-a069-45e9-9885-215d88334438",
        uuids: {
            uuid: "5248a0e1-a069-45e9-9885-215d88334438",
            name: "Polokalap"
        },
        color: "violet",
        session: "asd",
    };

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

export async function login(username: string, password: string): Promise<boolean> {

    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    let name = null;
    let email = null;

    if (emailCheck.test(username)) {

        email = username;

    } else {

        name = username;

    }

    const res = await fetch("https://api.mcauth.net/v1/auth", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    return res.ok;

}

export async function changeEmail(email: string, password: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/email", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ new_email: email, password }),
    });

    return res.ok;

}