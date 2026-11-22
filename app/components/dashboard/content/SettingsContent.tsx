import { Account } from "@/app/lib/types";
import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { Dispatch, SetStateAction, useState } from "react";
import {getAccentColor} from "@/app/lib/settings";

export default function SettingsContent({ user }: { user: Account }) {

    const [id, setId] = useState(0);

    return (

        <>

            <div className={"lg:p-8 p-4 pr-5 pl-5 mt-6"}>

                <h1 className={"lg:text-5xl text-4xl font-semibold"}>Account <span className={`text-[#${getAccentColor(user)}]`}>settings</span></h1>
                <p className={"text-white/70"}>Manage your account settings, and appearance</p>

            </div>

            <div className={"flex lg:flex-row flex-col gap-1 m-8 mt-5"}>

                <div className={"flex flex-col gap-3 p-2 pt-1 pb-1 rounded-md"}>

                    <div className={"flex flex-col gap-1 lg:w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Account</p>

                        <SettingsNavigation user={user} icon={"person"} id={id} setId={setId} text={"General"} this_element={0} />

                        <SettingsNavigation user={user} icon={"palette"} id={id} setId={setId} text={"Appearance"} this_element={1} />

                        <SettingsNavigation user={user} icon={"visibility_off"} id={id} setId={setId} text={"Privacy"} this_element={2} />

                    </div>

                    <div className={"flex flex-col gap-1 lg:w-50 bg-[#1a1a1a] p-2 rounded-md shadow-md"}>

                        <p className={"text-sm font-semibold"}>Security</p>

                        <SettingsNavigation user={user} icon={"security_key"} id={id} setId={setId} text={"2FA"} this_element={3} />

                        <SettingsNavigation user={user} icon={"logout"} id={id} setId={setId} text={"Sessions"} this_element={4} />

                    </div>

                </div>

                <div className={"flex flex-col gap-2 bg-[#1a1a1a] rounded-md shadow-md p-4 lg:w-full m-2"}>

                    <div>

                        <h2 className={"text-2xl font-semibold"}>General</h2>
                        <p className={"text-sm text-white/70"}>Your general account settings, password, email, etc.</p>

                    </div>

                    <div className={"flex flex-row gap-2"}>

                        <div className={"relative cursor-pointer"}>

                            <label
                                className={"cursor-pointer"}
                                htmlFor={"profile-picture-upload"}
                            >

                                <img
                                    src={`https://nmsr.jgj52.dev/face/${user.uuid}?w=96`}
                                    alt={"Profile picture"}
                                    className={"bg-[#1e1e1e]"}
                                />

                                <div className={"absolute bottom-0 right-0 flex flex-col items-center justify-center p-0.5 bg-[#1a1a1a]"}>

                                    <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                                </div>

                            </label>

                        </div>

                        <div className={"flex flex-col gap-1 p-3"}>

                            <p className={"font-semibold text-sm"}>Profile Picture</p>
                            <p className={"text-sm text-white/70"}>Click the image to set your new avatar</p>

                            <label
                                htmlFor={"profile-picture-upload"}
                                className={"bg-[#262626] hover:bg-[#2e2e2e] p-1 pr-2 pl-2 rounded-sm text-sm w-22 cursor-pointer duration-200"}
                            >
                                Upload PFP
                            </label>

                            <input
                                id={"profile-picture-upload"}
                                type={"file"}
                                accept={"image/*"}
                                className={"hidden"}
                            />

                        </div>

                    </div>

                </div>

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