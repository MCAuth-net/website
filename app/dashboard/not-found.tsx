"use client"

import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import Loading from "@/app/components/loading/Loading";
import { useEffect, useState } from "react";
import { Account } from "@/app/lib/types";
import { requireUser } from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";

export default function NotFound() {

    const [user, setUser] = useState<Account | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        setOpen(localStorage.getItem("sidebar_open") === "true");

        void requireUser().then(setUser);

    }, [])

    if (!user) return null;

    return (

        <>

            <div className={"flex flex-row"}>

                <Sidebar user={user} open={open} setOpen={setOpen} />

                <div className={`flex flex-col w-full`}>

                    <Topbar text={"Page not found"} open={open} setOpen={setOpen} />

                    <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                        <h1 className={"lg:text-5xl text-4xl font-semibold"}>Page not <span className={`text-[#${getAccentColor(user)}]`}>found</span></h1>
                        <p className={"text-white/70"}>This page does not exist, or is still under development. Check back soon!</p>

                    </div>

                </div>

            </div>

            <Loading seconds={1} />

        </>

    )

}