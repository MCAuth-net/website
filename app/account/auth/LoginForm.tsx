"use client"

import { useState } from "react";
import toast from "react-hot-toast";
import {login} from "@/app/lib/calls";

export default function LoginForm() {

    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setPending(true);

        const ok = await login(email, password);

        setPending(false);

        if (ok) {

            toast.success("Logged in successfully!")

            setTimeout(() => {

                window.location.href = "/dashboard";

            }, 3000);

        } else {

            toast.error("Invalid username or password")

        }

    };

    return (

        <form className={"flex flex-col gap-2 items-center"} onSubmit={handleSubmit}>

            <div className={"flex flex-col"}>

                <p className={"text-lg self-start"}>Username or email</p>

                <input
                    type={"text"}
                    className={"input w-70 text-lg"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <div className={"flex flex-col"}>

                <p className={"text-lg self-start"}>Password</p>

                <input
                    type={"password"}
                    className={"input w-70"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            </div>

            <button
                className={"flex flex-row gap-2 justify-center items-center mt-2 button-primary pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer text-[23px] duration-200"}
                type={"submit"}
                disabled={pending}
            >

                {pending ? "Logging in..." : "Log in"}

            </button>

        </form>

    )

}