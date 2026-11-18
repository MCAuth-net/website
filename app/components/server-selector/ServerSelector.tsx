"use client"

import { useState } from "react";

export default function ServerSelector() {

    const [uuid, setUuid] = useState("");
    const [server, setServer] = useState("");

    return (

        <>

            <form className={"server-section w-full"}>

                <p className={"minecraft text"}>Connect to server</p>

                <div className={"fbg-black border-2 bg-black border-white w-full h-10 cursor-text"}>

                    {

                        server !== ""

                            ?

                                <p className={"minecraft text-2xl"}>{ server }.mcauth.net</p>

                            :

                            <div className={"flex flex-row justify-center items-center h-10"}>

                                <img
                                    src={"/assets/loading.gif"}
                                    alt={"Loading animation"}
                                    width={"75px"}
                                    height={"40px"}
                                    className={"select-none mb-4"}
                                />

                            </div>

                    }

                </div>

            </form>

            <div className={"flex flex-row gap-3"}>

                {

                    uuid

                        ?

                            <>

                                <div className={"flex flex-row gap-2 items-center justify-center border border-[#2e2e2e] w-70 font-mono shadow-sm rounded-md pl-2 pr-2 pt-1 pb-1"}>

                                    <div className={"online mr-2"}></div>

                                    <img
                                        src={`https://nmsr.nickac.dev/face/${uuid}?w=32`}
                                        alt={"Player head"}
                                        className={"select-none"}
                                    />

                                    <p className={"text-xl"}>Polokalap</p>

                                </div>

                                <div className={"flex flex-row bg-[#3c8527dd] hover:bg-[#3c8527] p-2 items-center rounded-md cursor-pointer duration-200"}>

                                    <p>Let&#39;s go!</p>

                                </div>

                            </>

                        :

                            <div className={"flex flex-row justify-center border border-[#2e2e2e] w-70 font-mono shadow-sm rounded-md pl-2 pr-2 pt-1 pb-1"}>

                                <p>Waiting for player...</p>

                            </div>

                }

            </div>

        </>

    )

}