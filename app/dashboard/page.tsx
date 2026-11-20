import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import DashboardContent from "@/app/components/dashboard/content/DashboardContent";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import Loading from "@/app/components/loading/Loading";
import { requireUser } from "@/app/lib/auth";

export const instant = false;

export default async function Dashboard() {

    const user = await requireUser();

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