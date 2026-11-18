"use client"

import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";
import ServerSelector from "@/app/components/server-selector/ServerSelector";
import Image from "next/image";
import { useState } from "react";
import "./auth.css";

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

                                    <ServerSelector />

                                :

                                <div
                                    className={"flex flex-row gap-2 justify-center items-center bg-[#3c8527dd] hover:bg-[#3c8527] pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer minecraft-ten text-[23px] duration-200"}
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

                        <div className={"flex flex-col gap-2 items-center"}>

                            <div className={"flex flex-col"}>

                                <p className={"text-lg self-start"}>Username or email</p>

                                <input
                                    type={"text"}
                                    className={"input w-70 text-lg"}
                                    maxLength={16}
                                    name={"username"}
                                />

                            </div>

                            <div className={"flex flex-col"}>

                                <p className={"text-lg self-start"}>Password</p>

                                <input
                                    type={"password"}
                                    className={"input w-70"}
                                    name={"password"}
                                />

                            </div>

                            <button
                                className={"flex flex-row gap-2 justify-center items-center mt-2 bg-[#3c8527dd] hover:bg-[#3c8527] pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer text-[23px] duration-200"}
                            >

                                Log in

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <Loading seconds={1} />

        </>

    )

}