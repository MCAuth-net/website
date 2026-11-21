import { Account } from "@/app/lib/types";

export default function DashboardContent({ user }: { user: Account }) {

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <div className={"flex flex-col gap-4 w-full lg:h-50 h-50 rounded-sm shadow-md lg:p-8 p-3 pr-5 pl-5 bg-[#1e1e1e]"}>

                    <h1 className={"lg:text-5xl text-4xl font-semibold"}>Hi, <span className={"text-[#3c8527]"}>{ user.name }</span></h1>
                    <p className={"text-white/70"}>Welcome to MCAuth! Click the buttons bellow to navigate around your dashboard!</p>

                    <div className={"flex flex-row gap-2"}>

                        <a
                            href={"/dashboard/servers"}
                            className={"button-primary-flat w-35"}
                        >
                            Manage servers
                        </a>

                        <a
                            href={"/docs"}
                            className={"button-secondary w-32"}
                        >
                            Read the docs
                        </a>

                    </div>

                </div>

            </div>

        </>

    )

}