"use server"

import { createUser, verifyToken } from "@/app/lib/auth";
import { ServerResponse } from "@/app/lib/types";

export async function loginViaMc(_prev: ServerResponse, formData: FormData): Promise<ServerResponse> {

    const token = String(formData.get("token")) || "";
    const uuid = String(formData.get("uuid")) || "";

    const verification = await verifyToken(token, uuid);

    if (!verification.success) {

        return verification;

    }

    const user = await createUser(null, null, uuid);

    if ("success" in user && !verification.success) {

        return verification;

    }

    return {
        success: true,
    }

}