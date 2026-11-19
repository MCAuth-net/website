"use server"

import { verifyToken } from "@/app/lib/auth";
import { ServerResponse } from "@/app/lib/types";

export async function loginViaMc(_prev: ServerResponse, formData: FormData): Promise<ServerResponse> {

    const token = String(formData.get("token")) || "";
    const uuid = String(formData.get("uuid")) || "";

    const result = await verifyToken(token, uuid);

    if (!result.success) {

        return result;

    }

    return {
        success: true,
    }

}