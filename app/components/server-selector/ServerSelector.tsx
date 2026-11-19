"use client"

import { useEffect, useState } from "react";
import { loginViaMc } from "@/app/account/auth/action";

export default function ServerSelector() {

    const [profile, setProfile] = useState<{uuid: string, name: string}>();
    const [token, setToken] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [error, setError] = useState(false);
    const [hover, setHover] = useState(false);
    const [copyMessage, setCopyMessage] = useState("Copy address");

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        const controller = new AbortController()

        void fetch("https://api.mcauth.net/v1/token", {
            signal: controller.signal
        })
            .then(async (res) => {

                if (res.status === 200) {

                    const response = await res.json();

                    const tempToken = response.token;

                    setToken(response.token);
                    setMnemonic(response.mnemonic);

                    interval = setInterval(async () => {

                        const response = await fetch("https://api.mcauth.net/v1/token/check", {
                            signal: controller.signal,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ token: tempToken }),
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

                setMnemonic("Couldn't get server");
                setError(true);

            });

        return () => {
            controller.abort()
            if (interval) clearInterval(interval);
        };

    }, []);

    const handleCopy = async () => {

        setCopyMessage("Copied!");
        await navigator.clipboard.writeText(`${mnemonic}.mcauth.net`);

        setTimeout(() => {

            setCopyMessage("Copy address");

        }, 2000);

    };

    return (

        <>

            <form action={loginViaMc} className={"flex flex-col gap-3 w-full items-center justify-center"}>

                <div className={"server-section w-full justify-center"}>

                    <input type={"text"} name={"token"} value={token} hidden readOnly />

                    { error ? null : <p className={"minecraft text"}>Connect to server</p> }

                    <div className={"fbg-black border-2 bg-black border-white w-full h-10 cursor-text"}>

                        {

                            error ?

                                <p className={"minecraft text-2xl"}>{ mnemonic }</p>

                                :

                                (

                                mnemonic !== ""

                                    ?

                                        <p className={"minecraft text-2xl"}>{ mnemonic }.mcauth.net</p>

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

                    <div
                        className={"relative w-full cursor-pointer select-none mt-2"}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleCopy}
                    >

                        {

                            hover ?

                                <img
                                    src={"/assets/button_highlighted.png"}
                                    alt={"Button image"}
                                    width={"100%"}
                                />

                                    :

                                <img
                                    src={"/assets/button.png"}
                                    alt={"Button image"}
                                    width={"100%"}
                                />

                        }

                        <p className={"absolute bottom-[50%] right-[50%] translate-[50%] text minecraft !text-xl"}>{ copyMessage }</p>

                    </div>

                </div>

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

                                    <button type={"submit"} className={"flex flex-row bg-[#3c8527dd] hover:bg-[#3c8527] p-2 items-center rounded-md cursor-pointer select-none duration-200"}>

                                        <p>Let&#39;s go!</p>

                                    </button>

                                </>

                            :

                                <div className={"flex flex-row justify-center border border-[#2e2e2e] w-70 font-mono shadow-sm rounded-md pl-2 pr-2 pt-1 pb-1"}>

                                    <p>Waiting for player...</p>

                                </div>

                    }

                </div>

            </form>

        </>

    )

}