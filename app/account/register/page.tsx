import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";

export default function Page() {

    return (

        <>

            <div className={"mt-0 m-auto max-w-375 w-screen md:p-1 p-5"}>

                <NavBar />

                

            </div>

            <Loading seconds={0.5} />

        </>

    )

}