"use client"

import { useEffect, useState } from "react";
import { setInterval } from "node:timers";

export default function ServerSelector() {

    const [uuid, setUuid] = useState("");
    const [server, setServer] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {

        void fetch("https://api.mcauth.net/v1/token")
            .then(async (res) => {

                const token = await res.text();
                setServer(token);

                setInterval(async () => {

                    const response = await fetch("https://api.mcauth.net/v1/token/check", {
                        method: "POST",
                        headers: {
                            contentType: "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    switch (response.status) {

                        case 200:

                            setUuid(await response.json());

                            return;

                    }

                }, 2000);

            })
            .catch((e) => {

                setServer("Couldn't get server");
                setError(true);

            });

    }, []);

    return (

        <>

            <form className={"server-section w-full justify-center"}>

                { error ? null : <p className={"minecraft text"}>Connect to server</p> }

                <div className={"fbg-black border-2 bg-black border-white w-full h-10 cursor-text"}>

                    {

                        error ?

                            <p className={"minecraft text-2xl"}>{ server }</p>

                            :

                            (

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
                                            className={"select-none mb-4 cursor-default"}
                                        />

                                    </div>

                            )

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