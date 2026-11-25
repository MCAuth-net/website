import {Account} from "@/app/lib/types";
import {getAccentColor} from "@/app/lib/settings";
import GoogleIcon from "@/app/components/icons/GoogleIcon";
import {Dispatch, SetStateAction} from "react";

export default function SettingsNavigation({ user, text, icon = "question_mark", this_element, id, setId, saving, siteColor = getAccentColor(user) }: { user: Account, text: string; icon: string, this_element: number, id: number, setId: Dispatch<SetStateAction<number>>, saving: boolean, siteColor: string }) {

    const open = this_element === id;

    return (

        <>

            <div
                className={`flex flex-row gap-2 items-center ${open ? "bg-[#2e2e2e66]" : ""} hover:bg-[#2e2e2e] rounded-md p-1 duration-200 ${saving ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => {

                    if (saving) return;

                    setId(this_element);

                }}
            >

                <div className={`flex flex-col items-center justify-center p-0.5 bg-[#${open ? `${siteColor}` : "2a2a2a"}] rounded-md shadow-sm duration-200`}>

                    <GoogleIcon icon={icon} className={"scale-90 select-none"} />

                </div>

                <p className={"select-none"}>{ text }</p>

            </div>

        </>

    )

}