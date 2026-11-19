"use client"

import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import { useState } from "react";
import ServerSection from "@/app/components/server-section/ServerSection";
import "./auth.css";
import LoginForm from "@/app/account/auth/LoginForm";

export default function Page() {

    const [mc, setMc] = useState(false);

    return (

        <>

            <div className={"mt-0 m-auto max-w-375 w-screen md:p-1 p-5"}>

                <NavBar />

                <div className={"flex flex-col mt-40"}>

                    <div className={"relative flex flex-col gap-4 border border-[#2e2e2e] border-b-0 w-110 m-auto text-center p-4 rounded-t-2xl items-center duration-200"}>

                        <div>

                            <h2 className={"text-4xl"}>Authenticate</h2>
                            <p className={"text-white/50"}>You are logging into <b>MCAuth</b>.</p>

                        </div>

                        {

                            mc

                                ?

                                    <ServerSection />

                                :

                                <div
                                    className={"flex flex-row gap-2 justify-center items-center button-primary pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer minecraft-ten text-[23px] duration-200"}
                                    onClick={() => { setMc(true); }}
                                >

                                    <Image
                                        src={"/assets/mc-white.png"}
                                        alt={"Minecraft logo"}
                                        className={"w-7 h-7"}
                                        width={20}
                                        height={20}
                                    />
                                    
                                    Log in with Minecraft
                                </div>

                        }

                        <div className={"absolute -bottom-2.75 bg-[#111111] pl-3 pr-3 select-none"}>

                            <p className={"uppercase text-sm text-white/30"}>or</p>

                        </div>

                    </div>

                    <div className={"flex flex-col gap-6 border border-[#2e2e2e] w-110 m-auto text-center p-4 rounded-b-2xl shadow-xl"}>

                        <div>

                            <h2 className={"text-3xl"}>Already have an account?</h2>

                        </div>

                        <LoginForm />

                    </div>

                </div>

            </div>

            <Loading seconds={1} />

        </>

    )

}