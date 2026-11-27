import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAccentColor } from "@/app/lib/settings";
import toast from "react-hot-toast";

export default function PrivacySettings({ user, setUser, open, saving, setSaving, siteColor = getAccentColor(user) }: { user: Account, setUser: Dispatch<SetStateAction<Account | null>>, open: boolean, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>>, siteColor: string }) {

    const [defaultAltTracking, setDefaultAltTracking] = useState(true);
    const [defaultVpnLogging, setDefaultVpnLogging] = useState(true);

    const [altTracking, setAltTracking] = useState(defaultAltTracking);
    const [vpnLogging, setVpnLogging] = useState(defaultVpnLogging);

    useEffect(() => {

        if (
            altTracking != defaultAltTracking ||
            vpnLogging != defaultVpnLogging
        ) {

            setSaving(true);

        } else {

            if (open) setSaving(false);

        }

    }, [altTracking, vpnLogging]);

    const handleSave = () => {

        if (altTracking != defaultAltTracking) {

            const altTrackingChange = { success: true, error: null }; // TODO: Make it use the real API once it's done

            if (!altTrackingChange.success) {

                toast.error(altTrackingChange.error || "Internal server error");
                handleReset();
                return;

            }

        }

        if (vpnLogging != defaultVpnLogging) {

            const vpnLoggingChange = { success: true, error: null }; // TODO: Make it use the real API once it's done

            if (!vpnLoggingChange.success) {

                toast.error(vpnLoggingChange.error || "Internal server error");
                handleReset();
                return;

            }

        }

    };

    const handleReset = () => {

        setAltTracking(defaultAltTracking);
        setVpnLogging(defaultVpnLogging);

    };

    return (

        <>

            <div className={`absolute flex flex-col gap-2 p-4 w-full h-min m-2 bg-[#1a1a1a] rounded-md shadow-md ${open ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>

                <div>

                    <h2 className={"text-2xl font-semibold"}>Privacy</h2>
                    <p className={"text-sm text-white/70"}>What data we share with services, your alts and ip address</p>

                </div>

                <div className={"flex flex-col gap-2"}>

                    <div className={"flex flex-row items-center justify-between mt-1"}>

                        <p>Allow alt tracking</p>

                        <div className={"flex flex-row gap-3 items-center"}>

                            <div
                                className={`relative flex flex-col items-center justify-center w-12 h-6 ${altTracking ? `bg-[#${siteColor}dd] hover:bg-[#${siteColor}]` : "bg-[#1e1e1e] hover:bg-[#262626]"} border border-[#ffffff44] p-1 rounded-full shadow-md cursor-pointer duration-200`}
                                onClick={() => {

                                    setAltTracking(!altTracking);

                                }}
                            >

                                <div className={`absolute ${altTracking ? "right-1" : "right-6.5"} h-4 w-4 bg-white rounded-full duration-200`}></div>

                            </div>

                        </div>

                    </div>

                    <div className={"flex flex-row items-center justify-between mt-1"}>

                        <p>Allow VPN logging</p>

                        <div className={"flex flex-row gap-3 items-center"}>

                            <div
                                className={`relative flex flex-col items-center justify-center w-12 h-6 ${vpnLogging ? `bg-[#${siteColor}dd] hover:bg-[#${siteColor}]` : "bg-[#1e1e1e] hover:bg-[#262626]"} border border-[#ffffff44] p-1 rounded-full shadow-md cursor-pointer duration-200`}
                                onClick={() => {

                                    setVpnLogging(!vpnLogging);

                                }}
                            >

                                <div className={`absolute ${vpnLogging ? "right-1" : "right-6.5"} h-4 w-4 bg-white rounded-full duration-200`}></div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <SavingMenu saving={saving && open} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}