import GoogleIcon from "@/app/components/icons/GoogleIcon";
import GeneralSettings from "../settings/GeneralSettings";
import AppearanceSettings from "@/app/components/dashboard/settings/AppearanceSettings";
import { Account } from "@/app/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { getAccentColor } from "@/app/lib/settings";

export default function SettingsContent({ user }: { user: Account }) {

    const [id, setId] = useState(0);
    const [saving, setSaving] = useState(false);

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <h1 className={"lg:text-5xl text-4xl font-semibold"}>Account <span className={`text-[#${getAccentColor(user)}]`}>settings</span></h1>
                <p className={"text-white/70"}>Manage your account settings, and appearance</p>

            </div>

            { process.env.NEXT_PUBLIC_PRODUCTION === "true" && <div className={"fixed top-13 flex flex-col items-center justify-center backdrop-blur-[2px] w-full h-full z-10"}>

                <div className={"flex flex-col items-center"}>

                    <GoogleIcon icon={"lock"} className={"text-white/70 select-none scale-400"} />
                    <p className={"mt-10 text-white/70 text-xl"}>This page is under development!</p>
                    <p className={"text-white/70 text-xl"}>Come back soon.</p>

                </div>

            </div> }

            <div className={"relative flex md:flex-row flex-col gap-1 m-8 mt-5 h-full"}>

                <div className={"flex flex-col gap-3 p-2 pt-1 pb-1 rounded-md"}>

                    <div className={"flex flex-col gap-1 md:w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Account</p>

                        <SettingsNavigation user={user} icon={"person"} id={id} setId={setId} text={"General"} this_element={0} />

                        <SettingsNavigation user={user} icon={"palette"} id={id} setId={setId} text={"Appearance"} this_element={1} />

                        <SettingsNavigation user={user} icon={"visibility_off"} id={id} setId={setId} text={"Privacy"} this_element={2} />

                    </div>

                    <div className={"flex flex-col gap-1 md:w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Security</p>

                        <SettingsNavigation user={user} icon={"security_key"} id={id} setId={setId} text={"2FA"} this_element={3} />

                        <SettingsNavigation user={user} icon={"logout"} id={id} setId={setId} text={"Sessions"} this_element={4} />

                    </div>

                </div>

                {(() => {
                    switch (id) {
                        case 0:
                            return <GeneralSettings user={user} saving={saving} setSaving={setSaving} />;
                        case 1:
                            return <AppearanceSettings user={user} saving={saving} setSaving={setSaving} />;
                        default:
                            return null;
                    }
                })()}

            </div>

        </>

    )

}

function SettingsNavigation({ user, text, icon = "question_mark", this_element, id, setId }: { user: Account, text: string; icon: string, this_element: number, id: number, setId: Dispatch<SetStateAction<number>> }) {

    const open = this_element === id;

    return (

        <>

            <div
                className={`flex flex-row gap-2 items-center ${open ? "bg-[#2e2e2e66]" : ""} hover:bg-[#2e2e2e] rounded-md p-1 duration-200 cursor-pointer`}
                onClick={() => {

                    setId(this_element);

                }}
            >

                <div className={`flex flex-col items-center justify-center p-0.5 bg-[#${open ? `${getAccentColor(user)}` : "2a2a2a"}] rounded-md shadow-sm duration-200`}>

                    <GoogleIcon icon={icon} className={"scale-90"} />

                </div>

                <p>{ text }</p>

            </div>

        </>

    )

}