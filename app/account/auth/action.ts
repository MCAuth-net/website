"use server"

import { verifyToken } from "@/app/lib/auth";

export async function loginViaMc(formData: FormData) {

    const token = String(formData.get("token")) || "";

    const result = await verifyToken(token);

    if (!result) {



    }



}