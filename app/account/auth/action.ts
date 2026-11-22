export async function login(formData: FormData): Promise<boolean> {

    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");

    const res = await fetch("https://api.mcauth.net/v1/auth", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({ email: username, password }),
    });

    return res.ok;

}