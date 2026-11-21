"use client"

import { useEffect, useState } from "react";
import { ServerResponse } from "@/app/lib/types";
import {redirect} from "next/navigation";

export default function ServerSection() {

    const [open, setOpen] = useState(false);
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
                            credentials: "include",
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

                            // setTimeout(() => {

                            //     redirect("/dashboard?onboarding=true");

                            // }, 2000);

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

    if (!open) {

        return (

            <>

                <div
                    className={"flex flex-row gap-2 justify-center items-center button-primary pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer minecraft-ten text-[23px] duration-200"}
                    onClick={() => { setOpen(true); }}
                >

                    <img
                        src={"/assets/mc-white.png"}
                        alt={"Minecraft logo"}
                        className={"w-7 h-7"}
                        width={20}
                        height={20}
                    />

                    Log in with Minecraft
                </div>

            </>

        )

    }

    return (

        <>

            <form className={"flex flex-col gap-3 w-full items-center justify-center"}>

                <div className={`relative w-full h-43.75 justify-center`}>

                    <input type={"text"} name={"token"} value={token} hidden readOnly />
                    <input type={"text"} name={"uuid"} value={profile && profile.uuid} hidden readOnly />

                    <div className={`server-section ${profile ? "opacity-0" : "opacity-100"} duration-300`}>

                        <p className={"minecraft text"}>Connect to server</p>

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

                    <div
                        className={`absolute bottom-[50%] right-[50%] translate-[50%] flex flex-col w-full h-43.75 justify-center items-center ${profile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} duration-300`}
                    >

                        <img
                            src={"/assets/checkmark.png"}
                            alt={"Checkmark"}
                            width={"125px"}
                            className={"select-none mb-3"}
                        />

                        <h3 className={"text-2xl"}>Successfully logged in!</h3>
                        <p>You will be redirected soon!</p>

                    </div>
                    
                </div>

            </form>

        </>

    )

}