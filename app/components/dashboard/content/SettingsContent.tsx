import GoogleIcon from "@/app/components/icons/GoogleIcon";
import GeneralSettings from "../settings/GeneralSettings";
import AppearanceSettings from "@/app/components/dashboard/settings/AppearanceSettings";
import SettingsNavigation from "@/app/components/dashboard/settings/SettingsNavigation";
import PrivacySettings from "@/app/components/dashboard/settings/PrivacySettings";
import MFASettings from "@/app/components/dashboard/settings/MFASettings";
import { Account } from "@/app/lib/types";
import {Dispatch, SetStateAction, useState} from "react";
import { getAccentColor } from "@/app/lib/settings";

export default function SettingsContent({ user, setUser }: { user: Account, setUser: Dispatch<SetStateAction<Account | null>> }) {

    const [id, setId] = useState(0);
    const [saving, setSaving] = useState(false);
    const [siteColor, setSiteColor] = useState(getAccentColor(user));

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <h1 className={"lg:text-5xl text-4xl font-semibold"}>Account <span className={`text-[#${siteColor}]`}>settings</span></h1>
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

                        <p className={"text-sm font-semibold select-none"}>Account</p>

                        <SettingsNavigation user={user} icon={"person"} id={id} setId={setId} text={"General"} this_element={0} saving={saving} siteColor={siteColor} />

                        <SettingsNavigation user={user} icon={"palette"} id={id} setId={setId} text={"Appearance"} this_element={1} saving={saving} siteColor={siteColor} />

                        <SettingsNavigation user={user} icon={"visibility_off"} id={id} setId={setId} text={"Privacy"} this_element={2} saving={saving} siteColor={siteColor} />

                    </div>

                    <div className={"flex flex-col gap-1 md:w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold select-none"}>Security</p>

                        <SettingsNavigation user={user} icon={"security_key"} id={id} setId={setId} text={"2FA"} this_element={3} saving={saving} siteColor={siteColor} />

                        <SettingsNavigation user={user} icon={"logout"} id={id} setId={setId} text={"Sessions"} this_element={4} saving={saving} siteColor={siteColor} />

                    </div>

                </div>

                <div className={"relative flex flex-col md:w-full mr-4"}>

                    <GeneralSettings user={user} setUser={setUser} open={id === 0} saving={saving} setSaving={setSaving} siteColor={siteColor} />
                    <AppearanceSettings user={user} setUser={setUser} open={id === 1} saving={saving} setSaving={setSaving} siteColor={siteColor} setSiteColor={setSiteColor} />
                    <PrivacySettings user={user} setUser={setUser} open={id === 2} saving={saving} setSaving={setSaving} siteColor={siteColor} />
                    <MFASettings user={user} setUser={setUser} open={id === 3} saving={saving} setSaving={setSaving} siteColor={siteColor} />

                </div>

            </div>

        </>

    )

}