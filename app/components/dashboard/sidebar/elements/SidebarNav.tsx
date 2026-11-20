import Link from "next/link";
import GoogleIcon from "@/app/components/icons/GoogleIcon";

export default function SidebarNav({ open, icon, text, link }: { open: boolean, icon: string, text: string, link: string }) {

    return (

        <div className={`flex flex-col gap-2 ${open ? "p-3" : "p-2.5"} pt-0 items-center justify-center`}>

            <Link
                href={link}
                className={`relative flex flex-row gap-2 items-center text-[#afafaf] select-none w-full h-9 ${open ? "p-3" : "p-2.5"} pb-2 pt-2 rounded-md hover:bg-[#2e2e2e] duration-200`}
            >

                <GoogleIcon icon={icon} className={`absolute ${open ? "left-2" : "left-1.5"} duration-300`} />

                <p
                    aria-hidden={!open}
                    tabIndex={open ? 0 : -1}
                    className={`absolute bottom-[50%] translate-y-[50%] shrink-0 select-none transition-all duration-300 ease-out ${
                        open
                            ? "left-10 opacity-100"
                            : "-left-10 opacity-0 pointer-events-none"
                    }`}
                >
                    { text }
                </p>

            </Link>

        </div>

    )

}