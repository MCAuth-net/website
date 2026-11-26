import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { Account } from "@/app/lib/types";
import { useState } from "react";
import { getAccentColor } from "@/app/lib/settings";

export default function OnBoarding({ user }: { user: Account }) {

    const [open, setOpen] = useState(true);

    if (process.env.NEXT_PUBLIC_PRODUCTION === "true") return null;

    return (

        <>

            <div
                className={`block fixed top-0 left-0 w-screen h-screen bg-black/30 z-100 backdrop-blur-xs cursor-pointer ${open ? "opacity-100" : "opacity-0 pointer-events-none duration-300"}`}
                onClick={() => {

                    setOpen(false);

                }}
            >

            </div>

            <div className={
                `fixed bottom-0 right-[50%] translate-x-[50%] w-screen h-[85vh] lg:bottom-[50%] lg:right-[50%] lg:translate-[50%] lg:w-225 lg:h-200 rounded-t-2xl lg:rounded-xl shadow-xl shadow-black bg-[#1e1e1e] z-101 ${open ? "opacity-100" : "opacity-0 pointer-events-none duration-300"} border border-[#212121]`
            }>

                <div
                    className={"hidden lg:flex flex-col items-center justify-center absolute top-5 right-5 rounded-full bg-transparent hover:bg-[#2e2e2e] h-10 w-10 duration-200"}
                    onClick={() => {

                        setOpen(false);

                    }}
                >

                    <GoogleIcon icon={"close"} className={"text-white/50 scale-125 cursor-pointer"} />

                </div>

                <div className={"flex flex-col items-center lg:p-10 p-7"}>

                    <h1 className={"text-4xl lg:text-5xl font-semibold"}>Welcome to <span className={`text-[#${getAccentColor(user)}]`}>MCAuth</span>!</h1>
                    <p className={"text-white/70"}>Please fill out our onboarding, so you can have the best experience possible.</p>

                    <div className={"mt-5 flex flex-col items-center w-100 lg:w-150 p-3"}>

                        <div className={"flex flex-row justify-between w-full"}>

                            <p className={"text-lg"}>Username</p>

                            <div className={"flex flex-row gap-2 items-center"}>

                                <p className={"text-white/70 select-none text-mdf"}>{ user.name }</p>

                                <div className={"flex flex-col items-center justify-center bg-[#222222] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}>

                                    <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}