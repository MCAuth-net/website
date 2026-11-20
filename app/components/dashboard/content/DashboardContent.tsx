import { requireUser } from "@/app/lib/auth";

export default async function DashboardContent() {

    const user = await requireUser();

    return (

        <>



        </>

    )

}