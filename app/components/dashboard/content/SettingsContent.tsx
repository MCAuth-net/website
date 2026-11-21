import { Account } from "@/app/lib/types";
import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { Dispatch, SetStateAction, useState } from "react";

export default function SettingsContent({ user }: { user: Account }) {

    const [id, setId] = useState(0);

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <h1 className={"lg:text-5xl text-4xl font-semibold"}>Account <span>settings</span></h1>
                <p className={"text-white/70"}>Manage your account settings, and appearance</p>

            </div>

            <div className={"flex flex-row gap-4 m-8 mt-5"}>

                <div className={"flex flex-col gap-3 p-2 pt-1 pb-1 rounded-md"}>

                    <div className={"flex flex-col gap-1 w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Account</p>

                        <SettingsNavigation icon={"person"} id={id} setId={setId} text={"General"} this_element={0} />

                        <SettingsNavigation icon={"palette"} id={id} setId={setId} text={"Appearance"} this_element={1} />

                        <SettingsNavigation icon={"visibility_off"} id={id} setId={setId} text={"Privacy"} this_element={2} />

                    </div>

                    <div className={"flex flex-col gap-1 w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Security</p>

                        <SettingsNavigation icon={"security_key"} id={id} setId={setId} text={"2FA"} this_element={3} />

                        <SettingsNavigation icon={"logout"} id={id} setId={setId} text={"Sessions"} this_element={4} />

                    </div>

                </div>

            </div>

        </>

    )

}

function SettingsNavigation({ text, icon = "question_mark", this_element, id, setId }: { text: string; icon: string, this_element: number, id: number, setId: Dispatch<SetStateAction<number>> }) {

    const open = this_element === id;

    return (

        <>

            <div
                className={`flex flex-row gap-2 items-center ${open ? "bg-[#2e2e2e66]" : ""} hover:bg-[#2e2e2e] rounded-md p-1 duration-200 cursor-pointer`}
                onClick={() => {

                    setId(this_element);

                }}
            >

                <div className={`flex flex-col items-center justify-center p-0.5 bg-[#${open ? "3c8527" : "2a2a2a"}] rounded-md shadow-sm duration-200`}>

                    <GoogleIcon icon={icon} className={"scale-90"} />

                </div>

                <p>{ text }</p>

            </div>

        </>

    )

}