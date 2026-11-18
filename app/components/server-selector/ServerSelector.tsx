"use client"

import {useEffect, useState} from "react";

export default function ServerSelector() {

    const [profile, setProfile] = useState<{uuid: string, name: string}>();
    const [server, setServer] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        const controller = new AbortController()

        void fetch("https://api.mcauth.net/v1/token", {
            signal: controller.signal
        })
            .then(async (res) => {

                if (res.status === 200) {

                    const token = await res.text();
                    setServer(token);

                    interval = setInterval(async () => {

                        const response = await fetch("https://api.mcauth.net/v1/token/check", {
                            signal: controller.signal,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({token}),
                        });

                        if (response.status === 200) {

                            clearInterval(interval);
                            setProfile(await response.json());

                        }

                    }, 1000);

                } else throw new Error();

            })
            .catch((e) => {

                if (e.name === "AbortError") return;

                setServer("Couldn't get server");
                setError(true);

            });

        return () => {
            controller.abort()
            if (interval) clearInterval(interval);
        };

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

                    profile

                        ?

                            <>

                                <div className={"flex flex-row gap-2 items-center justify-center border border-[#2e2e2e] w-70 font-mono shadow-sm rounded-md pl-2 pr-2 pt-1 pb-1"}>

                                    <div className={"online mr-2"}></div>

                                    <img
                                        src={`https://nmsr.jgj52.dev/face/${profile.uuid}?w=32`}
                                        alt={"Player head"}
                                        className={"select-none"}
                                    />

                                    <p className={"text-xl"}>{ profile.name }</p>

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