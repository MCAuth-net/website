import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { useState } from "react";
import { Account } from "@/app/lib/types";

export default function Menu2fa({ user, siteColor }: { user: Account, siteColor: string }) {

    const [open, setOpen] = useState(true);
    const [page, setPage] = useState(0);
    const [code, setCode] = useState("");

    const split = user.email?.split("@");

    if (!split) return null;

    return (

        <>

            <div>

                <div
                    className={`block fixed top-0 left-0 w-screen h-screen bg-black/5 z-100 backdrop-blur-xs cursor-pointer ${open ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200`}
                    onClick={() => {

                        setOpen(false);

                    }}
                ></div>

                <div className={
                         `fixed -bottom-300 right-[50%] translate-x-[50%] w-screen h-[85vh] md:bottom-[50%] md:right-[50%] md:translate-[50%] md:w-110 md:h-80 rounded-t-2xl md:rounded-xl shadow-xl shadow-[#00000033] bg-[#1e1e1e] z-101 ${open ? "opacity-100 bottom-0" : "opacity-0 -bottom-300 md:bottom-0 pointer-events-none"} transition-[opacity,bottom] md:transition-opacity duration-200 border border-[#ffffff22] overflow-hidden`
                     }>

                    <div
                        className={"hidden md:flex flex-col items-center justify-center absolute top-3 right-3 rounded-full bg-transparent hover:bg-[#2e2e2e] h-10 w-10 duration-200 z-100"}
                        onClick={() => {

                            setOpen(false);

                        }}
                    >

                        <GoogleIcon icon={"close"} className={"text-white/50 scale-125 cursor-pointer select-none"} />

                    </div>

                    <div className={`absolute ${ page == 0 ? "top-0 opacity-100" : "top-150 opacity-0 pointer-events-none"} flex flex-col gap-5 items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                        <div className={"flex flex-col gap-2"}>

                            <h1 className={"text-4xl md:text-[27px] font-semibold"}>Multi-Factor Authentication</h1>
                            <p className={"text-[17px] font-semibold"}>We&#39;ve sent an email to <span className={`text-white/90`}>{ `${"*".repeat(Math.min(split[0].length, 9))}@${split[1]}` }</span>. <br/> Please enter the code you received.</p>

                        </div>

                        <div className={"flex flex-col gap-1 w-full"}>

                            <p className={"text-md"}>Enter Received Auth Code</p>

                            <div className={"flex flex-row gap-2"}>

                                <input
                                    type={"text"}
                                    className={"input !border-[#ffffff22] !active:border-[#ffffff66] !p-2 !pl-3 !pr-3 !rounded-lg"}
                                    inputMode={"numeric"}
                                    pattern={"[0-9]*"}
                                    value={code || ""}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                    maxLength={6}
                                    placeholder={"6-digit authentication code"}
                                />

                                <div
                                    className={"flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200"}
                                >

                                    <p className={"text-[16px]"}>Resend email?</p>

                                </div>

                            </div>

                        </div>

                        <div className={"flex flex-row gap-2 justify-between w-full"}>

                            <div className={`flex flex-col items-center justify-center bg-[#${siteColor}dd] hover:bg-[#${siteColor}] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}>

                                <p className={"text-lg font-semibold"}>Confirm</p>

                            </div>

                            <div className={`flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}>

                                <p className={"text-lg"}>Cancel</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}