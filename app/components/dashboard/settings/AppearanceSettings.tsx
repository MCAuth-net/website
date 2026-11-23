import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import { Account } from "@/app/lib/types";
import { logout } from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";

export default function AppearanceSettings({ user }: { user: Account}) {

    return (

        <>

            <div className={"flex flex-col gap-2 bg-[#1a1a1a] rounded-md shadow-md p-4 lg:w-full m-2"}>

                <div>

                    <h2 className={"text-2xl font-semibold"}>Appearance</h2>
                    <p className={"text-sm text-white/70"}>Make the website look exactly how you want it</p>

                </div>

                <div className={"flex flex-col gap-1 mt-3"}>

                    <p className={"text-lg font-semibold"}>Accent color</p>

                    <div className={"flex flex-row gap-1"}>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#3c8527] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Green</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#3c5ccc] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Blue</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#1f9c8f] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Teal</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#7a3cc8] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Violet</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#e05c9c] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Pink</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#f0c020] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Yellow</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#c83030] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Red</p>

                        </div>

                        <div className={"flex flex-col items-center justify-center w-15"}>

                            <div
                                className={"w-10 h-10 border-2 border-[#00000066] bg-[#8a8a8a] rounded-full cursor-pointer"}
                            ></div>

                            <p className={"text-sm font-semibold"}>Grey</p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}