import { Account } from "@/app/lib/types";
import { useEffect, useRef, useState } from "react";
import GoogleIcon from "@/app/components/icons/GoogleIcon";
import {logout} from "@/app/dashboard/actions";

export default function SidebarUser({ open, user }: { open: boolean, user: Account }) {

    const submenuRef = useRef<HTMLDivElement | null>(null);
    const [submenu, setSubmenu] = useState(false);

    useEffect(() => {

        if (!submenu) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {

                setSubmenu(false);

            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [submenu]);

    return (

        <>

            <div
                className={"relative pt-1 pb-1"}
                ref={submenuRef}
            >

                <div
                    className={`flex flex-row gap-2 items-center h-12 cursor-pointer rounded-md pl-2" ${open ? "hover:bg-[#2e2e2e]" : ""} duration-200`}
                    onClick={() => { setSubmenu(!submenu); }}
                >

                    <div className={`absolute ${open ? "left-2" : "left-0"} bottom-[50%] translate-y-[50%] flex flex-row justify-center items-center duration-300`}>

                        <img
                            src={`https://nmsr.jgj52.dev/face/${user.uuid}?w=36`}
                            alt={"Profile picture"}
                            width={"36px"}
                            className={"rounded-full shadow-sm shadow-[#00000066] select-none z-100"}
                        />

                    </div>

                    <div className={`absolute flex flex-col justify-center select-none mt-1 ${open ? "left-13 opacity-100" : "-left-30 opacity-0 pointer-events-none"} duration-300`}>

                        <p className={"text-sm font-bold leading-4"}>Polokalap</p>
                        <p className={"text-[12px] text-white/70"}>Click for more options</p>

                    </div>

                </div>

                <div
                    className={`absolute bottom-14 right-[50%] translate-x-[50%] flex flex-col gap-1 w-full bg-[#1a1a1a] border border-[#2e2e2e66] rounded-md shadow-md p-1 duration-100 ${submenu && open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
                    ref={submenuRef}
                >

                    <div
                        className={"flex flex-row gap-1 p-1 pr-2 pl-2 cursor-pointer hover:bg-[#2e2e2e] rounded-md select-none duration-200"}
                        onClick={async () => {

                            await logout();

                        }}
                    >

                        <GoogleIcon icon={"logout"} className={"text-red-400"} />

                        <p className={"text-red-400"}>Log out</p>

                    </div>

                </div>

            </div>

        </>

    )

}