import NavBar from "@/app/components/navbar/NavBar";
import Link from "next/link";
import Loading from "@/app/components/loading/Loading";

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
                          href={"/register"}
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

                  <div className={"flex md:flex-row flex-col gap-10 justify-between items-center mt-40"}>

                      <div className={"flex flex-col gap-1 w-100 h-30 items-center border border-[#2e2e2e] p-5 rounded-xl shadow-xl"}>

                          <h2 className={"text-3xl"}>Integrate</h2>

                          <div className={"flex flex-row gap-1"}>

                              <p>Integrate MCAuth in your website, discord bot, literally whatever you&#39;d like, thanks to our SDK</p>

                          </div>

                      </div>

                      <img
                          src={"/assets/arrow.png"}
                          alt={"Arrow"}
                          className={"w-[75px] h-[64px] md:rotate-0 rotate-90"}
                      />

                      <div className={"flex flex-col gap-1 w-100 h-30 items-center border border-[#2e2e2e] p-5 rounded-xl shadow-xl"}>

                          <h2 className={"text-3xl"}>Authenticate</h2>

                          <div className={"flex flex-row gap-1"}>

                              <p>Let your users safely authenticate by joining one of our authentication servers</p>

                          </div>

                      </div>

                      <img
                          src={"/assets/arrow.png"}
                          alt={"Arrow"}
                          className={"w-[75px] h-[64px] md:rotate-0 rotate-90"}
                      />

                      <div className={"flex flex-col gap-1 w-100 h-30 items-center border border-[#2e2e2e] p-5 rounded-xl shadow-xl"}>

                          <h2 className={"text-3xl"}>You are in!</h2>

                          <div className={"flex flex-row gap-1"}>

                              <p>That&#39;s it! You are logged in.</p>

                          </div>

                      </div>

                  </div>

              </div>

          </div>

          <Loading seconds={2} />

      </>

  );

}
