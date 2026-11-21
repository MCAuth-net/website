"use client"

import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";
import ServerSection from "@/app/components/server-section/ServerSection";
import LoginForm from "@/app/account/auth/LoginForm";
import { useEffect, useState } from "react";
import {Account} from "@/app/lib/types";
import {requireUser} from "@/app/lib/calls";
import "./auth.css";

export default function Page() {

    const [user, setUser] = useState<Account | null>(null);

    useEffect(() => {

        void requireUser().then(setUser);

    }, [])

    if (!user) return null;

    return (

        <>

            <div className={"mt-0 m-auto max-w-375 w-screen md:p-1 p-5"}>

                <NavBar />

                <div className={"flex flex-col mt-40"}>

                    <div className={"relative flex flex-col gap-4 border border-[#2e2e2e] border-b-0 w-110 m-auto text-center p-4 rounded-t-2xl items-center duration-200"}>

                        <div>

                            <h2 className={"text-4xl"}>Authenticate</h2>
                            <p className={"text-white/50"}>You are logging into <b>MCAuth</b>.</p>

                        </div>

                        <ServerSection />

                        <div className={"absolute -bottom-2.75 bg-[#111111] pl-3 pr-3 select-none"}>

                            <p className={"uppercase text-sm text-white/30"}>or</p>

                        </div>

                    </div>

                    <div className={"flex flex-col gap-6 border border-[#2e2e2e] w-110 m-auto text-center p-4 rounded-b-2xl shadow-xl"}>

                        <div>

                            <h2 className={"text-3xl"}>Already have an account?</h2>

                        </div>

                        <LoginForm />

                    </div>

                </div>

            </div>

            <Loading seconds={1} />

        </>

    )

}