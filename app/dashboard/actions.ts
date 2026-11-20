import { redirect } from "next/navigation";

export async function logout() {

    const res = await fetch("https://api.mcauth.net/v1/profile/logout", {
        method: "DELETE",
        headers: {
            credentials: "include",
        }
    })

    if (res.ok) {

        redirect("/auth");

    }

}