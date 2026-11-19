import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import {Suspense} from "react";
import DashboardContent from "@/app/components/dashboard/content/DashboardContent";

export default async function Dashboard() {

    return (

        <>

            <Sidebar />

            <Suspense>

                <DashboardContent />

            </Suspense>

        </>

    )

}