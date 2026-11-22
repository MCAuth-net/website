"use client"

import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import DashboardContent from "@/app/components/dashboard/content/DashboardContent";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import Loading from "@/app/components/loading/Loading";
import {Suspense, useEffect, useState} from "react";
import { Account } from "@/app/lib/types";
import { requireUser } from "@/app/lib/calls";
import {useSearchParams} from "next/navigation";
import OnBoarding from "@/app/components/dashboard/onboarding/OnBoarding";

function OnboardingGate({ user }: { user: Account }) {

    const searchParams = useSearchParams();
    const onboarding = searchParams.get("onboarding") === "true";

    if (!onboarding) return null;

    return <OnBoarding user={user} />;

}

export default function Dashboard() {

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

                    <Topbar text={"Dashboard"} open={open} setOpen={setOpen} />

                    <DashboardContent user={user} />

                </div>

            </div>

            <Suspense fallback={null}>

                <OnboardingGate user={user} />

            </Suspense>

            <Loading seconds={1} />

        </>

    )

}