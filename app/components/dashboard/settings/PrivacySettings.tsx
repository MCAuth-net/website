import GoogleIcon from "@/app/components/icons/GoogleIcon";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import { Dispatch, SetStateAction } from "react";

export default function PrivacySettings({ user, open, saving, setSaving }: { user: Account, open: boolean, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>> }) {

    const handleSave = () => {



    };

    const handleReset = () => {



    };

    return (

        <>

            <div className={`absolute flex flex-col gap-2 p-4 w-full h-min m-2 bg-[#1a1a1a] rounded-md shadow-md ${open ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>

                <div>

                    <h2 className={"text-2xl font-semibold"}>Privacy</h2>
                    <p className={"text-sm text-white/70"}>What data we share with services, your alts and ip address</p>

                </div>

                <div className={"flex flex-col gap-2"}>



                </div>

            </div>

            <SavingMenu saving={saving && open} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}