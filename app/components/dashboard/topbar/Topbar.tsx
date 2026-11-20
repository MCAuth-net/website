export default function Topbar({ text }: { text: string }) {

    return (

        <>

            <div className={"relative flex flex-row justify-between items-center w-full h-13 p-5 border-b border-[#1a1a1a] text-white/70 select-none"}>

                <p>{ text }</p>

            </div>

        </>

    )

}