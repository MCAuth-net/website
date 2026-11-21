import { Account } from "@/app/lib/types";

export default function SettingsContent({ user }: { user: Account }) {

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <h1 className={"lg:text-5xl text-4xl font-semibold"}>Account <span>settings</span></h1>
                <p className={"text-white/70"}>Manage your account settings, and appearance</p>

            </div>

        </>

    )

}