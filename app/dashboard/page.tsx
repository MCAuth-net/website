"use client"

import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import DashboardContent from "@/app/components/dashboard/content/DashboardContent";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import Loading from "@/app/components/loading/Loading";
import { useEffect, useState } from "react";
import { Account } from "@/app/lib/types";
import { requireUser } from "@/app/lib/calls";

export default function Dashboard() {

    const [user, setUser] = useState<Account | null>(null);

    useEffect(() => {

        void requireUser().then(setUser);

    }, [])

    if (!user) return null;

    return (

        <>

            <div className={"flex flex-row"}>

                <Sidebar user={user} />

                <div className={`flex flex-col w-full`}>

                    <Topbar text={"Dashboard"} />

                    <DashboardContent />

                </div>

            </div>

            <Loading seconds={1} />

        </>

    )

}