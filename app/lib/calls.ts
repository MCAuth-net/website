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

export async function confirmEmail(code: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/email/confirm", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ code }),
    });

    return res.ok;

}

export async function changePassword(old_password: string, new_password: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/password", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ old_password, new_password }),
    });

    return res.ok;

}

export async function changeColor(color: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/color", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ new_color: color }),
    });

    return res.ok;

}

export async function changeName(name: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/name", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ new_name: name }),
    });

    return res.ok;

}

export async function changePrimaryUUID(uuid: string): Promise<boolean> {

    const res = await fetch("https://api.mcauth.net/v1/profile/change/uuid", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ primary_uuid: uuid }),
    });

    return res.ok;

}

export async function changePfp(file: File): Promise<boolean> {

    const form = new FormData()
    form.append("pfp", file)

    const res = await fetch("https://api.mcauth.net/v1/profile/change/pfp", {
        method: "POST",
        credentials: "include",
        headers: {
            accept: "application/json",
        },
        body: form,
    });

    return res.ok;

}