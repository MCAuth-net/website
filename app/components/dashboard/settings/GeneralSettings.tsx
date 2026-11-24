import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import { logout } from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";
import { Dispatch, SetStateAction } from "react";

export default function GeneralSettings({ user, saving, setSaving }: { user: Account, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>> }) {

    const handleSave = () => {



    };

    const handleReset = () => {



    };

    return (

        <>

            <div className={"flex flex-col gap-2 bg-[#1a1a1a] rounded-md shadow-md p-4 md:w-full h-min m-2"}>

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

                <div className={"flex flex-row justify-between mt-1"}>

                    <p>Display name</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={"text-white/70 select-none"}>{ user.displayName || "Not set yet" }</p>

                        <div className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}>

                            <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between mt-1"}>

                    <p>Username</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={"text-white/70 select-none"}>{ user.name }</p>

                        <div className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}>

                            <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between mt-1"}>

                    <p>Email</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={`text-white/70 select-none ${user.email ? "blur-sm " : ""} hover:blur-none duration-200`}>{ user.email || "Not set yet" }</p>

                        <div className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}>

                            <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between"}>

                    <div
                        className={`flex flex-row gap-1 items-center bg-[#${getAccentColor(user)}dd] hover:bg-[#${getAccentColor(user)}] rounded-md p-1 pr-2 duration-200 cursor-pointer`}
                        onClick={async () => {

                            await logout();
                            toast.success("Logged out!");

                            setTimeout(() => {

                                window.location.reload();

                            }, 1000);

                        }}
                    >

                        <GoogleIcon icon={"logout"} className={"select-none"} />

                        <p className={"select-none"}>Log out</p>

                    </div>

                </div>

            </div>

            <SavingMenu saving={saving} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}