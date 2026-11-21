import GoogleIcon from "@/app/components/icons/GoogleIcon";
import {Dispatch, SetStateAction} from "react";

export default function Topbar({ text, open, setOpen }: { text: string, open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {

    return (

        <>

            <div className={"relative flex flex-row justify-between items-center w-full h-13 p-2 lg:p-5 border-b border-[#1a1a1a] text-white/70 select-none"}>

                <div className={"flex flex-row gap-2 items-center"}>

                    <div
                        className={"lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-[#2e2e2e] cursor-pointer duration-200"}
                        onClick={() => {

                            setOpen(!open);

                        }}
                    >

                        <GoogleIcon icon={"menu"} className={"text-[#afafaf] select-none"} />

                    </div>

                    <p>{ text }</p>

                </div>

            </div>

        </>

    )

}