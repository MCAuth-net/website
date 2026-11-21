"use client"

import GoogleIcon from "@/app/components/icons/GoogleIcon";
import { Dispatch, SetStateAction, useEffect } from "react";
import SidebarNav from "@/app/components/dashboard/sidebar/elements/SidebarNav";
import { Account } from "@/app/lib/types";
import SidebarUser from "@/app/components/dashboard/sidebar/elements/SidebarUser";

export default function Sidebar({ user, open, setOpen }: { user: Account, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {

    useEffect(() => {

        localStorage.setItem("sidebar_open", String(open));

    }, [open]);

    return (

        <>

            <div className={`fixed lg:relative flex flex-col h-screen bg-[#111111] ${open ? "w-60 left-0" : "w-15 lg:left-0 -left-15"} border-r border-[#1a1a1a] transition-[width,left] duration-300 ease-out overflow-clip lg:z-1 z-100`}>

                <div className={`flex flex-row w-full h-15 items-center ${open ? "p-3 pb-0 pt-0" : "p-2.5 pb-0 pt-0"}`}>

                    <a
                        href={"/dashboard"}
                        aria-hidden={!open}
                        tabIndex={open ? 0 : -1}
                        className={`shrink-0 select-none transition-all duration-300 ease-out ${
                            open
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4 pointer-events-none"
                        }`}
                    >

                        <img
                            src={"/assets/logo.png"}
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

                <div className={"flex flex-col justify-between w-full h-full"}>

                    <div className={"flex flex-col w-full mt-3"}>

                        <SidebarNav open={open} text={"Applications"} icon={"link_2"} link={"/dashboard/apps"} />
                        <SidebarNav open={open} text={"Services"} icon={"database"} link={"/dashboard/services"} />
                        <SidebarNav open={open} text={"Community"} icon={"public"} link={"https://dc.mcauth.net"} />
                        <SidebarNav open={open} text={"Docs"} icon={"docs"} link={"/docs"} />

                    </div>

                    <div className={"p-2.5"}>

                        <SidebarUser open={open} user={user} />

                    </div>

                </div>

            </div>

        </>

    )

}