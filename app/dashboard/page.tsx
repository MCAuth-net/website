import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import DashboardContent from "@/app/components/dashboard/content/DashboardContent";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import { Suspense } from "react";

export default async function Dashboard() {

    return (

        <>

            <div className={"flex flex-row"}>

                <Sidebar />

                <div className={`flex flex-col w-full`}>

                    <Topbar />

                    <Suspense>

                        <DashboardContent />

                    </Suspense>

                </div>

            </div>

        </>

    )

}