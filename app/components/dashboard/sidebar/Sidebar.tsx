"use client"

import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { useState } from "react";

export default function Sidebar() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <div className={`fixed left-0 top-0 lg:flex hidden flex-col h-screen ${open ? "w-60" : "w-15"} border-r border-[#1a1a1a] duration-300`}>

                <div className={`flex flex-row w-full h-15 items-center ${open ? "p-3 pb-0 pt-0" : "p-2.5 pb-0 pt-0"} overflow-clip`}>

                    <a
                        href={"/"}
                        aria-hidden={!open}
                        tabIndex={open ? 0 : -1}
                        className={`shrink-0 select-none transition-all duration-300 ease-out ${
                            open
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4 pointer-events-none"
                        }`}
                    >

                        <img
                            src={"assets/logo.png"}
                            className={"select-none"}
                            width={128}
                        />

                    </a>

                    <div
                        className={"absolute right-2.5 flex flex-col items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-[#2e2e2e] cursor-pointer duration-200"}
                        onClick={() => {

                            setOpen(!open);

                        }}
                    >

                        <GoogleIcon icon={open ? "left_panel_open" : "left_panel_close"} className={"text-[#afafaf] select-none"} />

                    </div>

                </div>

            </div>

        </>

    )

}