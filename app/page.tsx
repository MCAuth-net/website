import NavBar from "@/app/components/navbar/NavBar";
import Link from "next/link";

export default function Home() {

  return (

      <>

          <div className={"mt-0 m-auto max-w-375 w-screen md:p-1 p-5"}>

              <NavBar />

              <div className={"flex flex-col gap-8 h-screen mt-30"}>

                  <h1 className={"minecraft-ten lg:text-9xl md:text-7xl text-5xl"}>Authentication <br /> made easy.</h1>
                  <h2 className={"minecraft text-2xl"}>We help owners verify their players&#39; identity.</h2>

                  <div className={"relative flex flex-row gap-2 items-center md:self-start self-center"}>

                      <Link
                          href={"/auth"}
                          className={"relative bg-[#3c8527dd] hover:bg-[#3c8527] bottom-0 hover:bottom-0.5 pl-5 pr-5 pt-3 pb-3 !text-white rounded-sm"}
                      >

                          <p>Get started</p>

                      </Link>

                      <Link
                          href={"/docs"}
                          className={"relative bg-[#333333aa] hover:bg-[#333333cc] bottom-0 hover:bottom-0.5 pl-5 pr-5 pt-3 pb-3 !text-white rounded-sm"}
                      >

                          <p>Documentation</p>

                      </Link>

                  </div>

              </div>

          </div>

      </>

  );

}
