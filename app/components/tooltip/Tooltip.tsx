import {useState} from "react";
import GoogleIcon from "@/app/components/icons/GoogleIcon";

export default function Tooltip({ text }: { text: string}) {

    const [open, setOpen] = useState(false);

    return (

        <>

            <div className={"relative flex flex-row items-center h-full"}>

                <div
                    className={"leading-0 cursor-pointer hover:bg-[#2e2e2e] rounded-full duration-200"}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >

                    <GoogleIcon icon={"info_i"} className={"scale-80 text-[#ffffffaa] select-none"} />

                </div>

                <div className={`absolute ${open ? "right-7.5 opacity-100" : "right-5 opacity-0 pointer-events-none"} flex flex-row items-center w-max max-w-64 bg-[#1e1e1e] px-2 py-1 rounded-md border border-[#ffffff22] h-full duration-200`}>

                    { text }

                </div>

            </div>

        </>

    )

}