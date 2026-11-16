"use client"

import { useEffect, useState } from "react";
import "./Loading.css";

const LOADING = 2;
const FADE = 300;

export default function Loading({ seconds = LOADING }: { seconds?: number }) {

    const [phase, setPhase] = useState<"visible" | "fading" | "hidden">("visible");
    const [dots, setDots] = useState("");

    useEffect(() => {

        const interval = setInterval(
            () => setDots((d) => (d.length >= 3 ? "" : d + ".")),
            400
        );
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        const timer = setTimeout(() => setPhase("fading"), seconds * 1000);
        return () => clearTimeout(timer);

    }, [seconds]);

    if (phase === "hidden") return null;

    const fading = phase === "fading";

    return (

        <>

            <div
                className={[
                    "fixed flex flex-col gap-8 bg-[#101010] w-screen h-screen z-101 items-center justify-center",
                    "transition-opacity ease-out",
                    fading ? "opacity-0 pointer-events-none" : "opacity-100",
                ].join(" ")}
                style={{ transitionDuration: `${FADE}ms` }}
            >

                <div className={"bg-[#3c8527] w-30 h-30 loading-animation"}>

                </div>

                <h3 className={"minecraft-ten text-3xl"}>
                    Loading
                    <span className={"inline-block w-[1.5ch] text-left"} aria-hidden="true">
                        {dots}
                    </span>
                </h3>

            </div>

        </>

    )

}