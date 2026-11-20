"use client"

import Image from "next/image";
import Link from "next/link";
import "./NavBar.css";
import { useEffect, useState } from "react";

export default function NavBar() {

    const [open, setOpen] = useState(false);

    useEffect(() => {

        const mq = window.matchMedia("(max-width: 767px)");

        const apply = () => {
            document.body.style.overflow = open && mq.matches ? "hidden" : "";
        };

        apply();

        mq.addEventListener("change", apply);

        return () => {
            mq.removeEventListener("change", apply);
            document.body.style.overflow = "";
        };

    }, [open]);

    return (

        <>

            <div className={"fixed top-0 left-0 backdrop-blur-2xl md:h-20 h-30 w-full z-100"}>

                <div className={"absolute right-[50%] translate-x-[50%] max-w-375 w-screen md:p-1 p-5"}>

                    <div className={"relative flex flex-row justify-between md:w-full z-100"}>

                        <div className={"flex flex-row gap-1"}>

                            <Link href="/">
                                <Image
                                    src={"/assets/logo.png"}
                                    alt={"logo"}
                                    className={"select-none cursor-pointer md:w-32"}
                                    width={150}
                                    height={150}
                                />
                            </Link>

                        </div>

                        <div className={"hidden md:flex flex-row gap-8 items-center text-sm select-none"}>

                            <Link href={"/features"}>Features</Link>
                            <Link href={"/docs"}>Docs</Link>
                            <Link href={"/faq"}>FAQ</Link>
                            <Link href={"https://dc.mcauth.net"}>Discord</Link>

                        </div>

                        <div className={"hidden md:flex flex-row gap-5 items-center"}>

                            <Link className={"button-secondary"} href="/auth">Log in</Link>
                            <Link className={"bg-[#3c8527dd] hover:bg-[#3c8527] pr-3 pl-3 pt-1 pb-1 !text-white rounded-md"} href="/auth">Get started</Link>

                        </div>

                        <div
                            className={"md:hidden flex flex-row w-12 h-12 p-3 mr-3 self-center hover:bg-white/10 rounded-sm cursor-pointer z-5 duration-200"}
                            onClick={() => setOpen(!open)}
                        >

                            {

                                open

                                    ?

                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"
                                         strokeLinejoin="miter" aria-hidden="true" focusable="false" className="h-6 w-6">
                                        <path d="M5 5l14 14M19 5 5 19"></path>
                                    </svg>

                                    :

                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="square"
                                         strokeLinejoin="miter" aria-hidden="true" focusable="false" className="h-6 w-6">
                                        <path d="M3 7h18M3 12h18M3 17h18"></path>
                                    </svg>

                            }

                        </div>

                    </div>

                    {

                        open

                        ?

                            <>

                                <div className={"fixed top-0 left-0 md:hidden flex flex-col gap-2 bg-[#1e1e1e] w-screen h-screen z-1"}>

                                    <div className={"absolute top-30 flex flex-col gap-2 w-screen h-[160vw] z-2 p-9"}>

                                        <Link className={"text-3xl font-semibold"} href={"/features"}>Features</Link>
                                        <Link className={"text-3xl font-semibold"} href={"/docs"}>Docs</Link>
                                        <Link className={"text-3xl font-semibold"} href={"/faq"}>FAQ</Link>
                                        <Link className={"text-3xl font-semibold"} href={"https://dc.mcauth.net"} target={"_blank"}>Discord</Link>

                                    </div>

                                    <div className={"absolute bottom-25 flex flex-row gap-2 w-screen z-2 p-2 justify-between"}>

                                        <Link className={"flex flex-row items-center justify-center text-xl bg-[#3c8527dd] hover:bg-[#3c8527] !text-white rounded-md w-full h-12"} href={"/register"}>Get Started</Link>
                                        <Link className={"flex flex-row items-center justify-center text-xl bg-[#333333aa] hover:bg-[#333333cc] !text-white rounded-md w-full h-12"} href={"/login"}>Sign in</Link>

                                    </div>

                                </div>

                            </>

                        :

                            null

                    }

                </div>

            </div>

        </>

    )

}