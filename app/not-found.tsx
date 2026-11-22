"use client"

import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";

export default function NotFound() {

    return (

        <>

            <div className={"mt-0 m-auto max-w-375 w-screen md:p-1 p-5"}>

                <NavBar />

                <div className={"flex flex-col items-center gap-8 h-screen mt-30"}>

                    <h1 className={"minecraft-ten lg:text-7xl md:text-5xl text-4xl"}>404</h1>
                    <h2 className={"minecraft text-xl"}>This page could not be found.</h2>

                </div>

            </div>

            <Loading seconds={1} />

        </>

    );

}