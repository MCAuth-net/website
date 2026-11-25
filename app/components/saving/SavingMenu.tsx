import { Dispatch, SetStateAction } from "react";
import { getAccentColor } from "@/app/lib/settings";
import { Account } from "@/app/lib/types";

export default function SavingMenu({ saving, setSaving, onSave, onReset, user, siteColor = getAccentColor(user) }: { saving: boolean, setSaving: Dispatch<SetStateAction<boolean>>, onSave: () => void, onReset: () => void, user: Account, siteColor: string }) {

    return (

        <>

            <div className={`fixed right-[50%] ${saving ? "bottom-5 opacity-100" : "-bottom-20 opacity-0 pointer-events-none"} transition-[bottom,opacity] duration-300 translate-x-[50%] flex flex-row items-center p-4 justify-between lg:w-[75vw] max-w-200 md:min-w-110 w-100 h-13 bg-[#1e1e1e] rounded-xl shadow-lg border border-[#2e2e2e]`}>

                <p className={"text-white/70 select-none text-sm md:text-[16px]"}>Don&#39;t forget to save your changes!</p>

                <div className={"flex flex-row gap-2"}>

                    <div
                        className={`flex flex-col items-center justify-center bg-[#2f2f2fdd] hover:bg-[#3e3e3e] border border-[#ffffff33] p-3 pt-1 pb-1 rounded-md cursor-pointer duration-200`}
                        onClick={() => {

                            setSaving(false);
                            onReset();

                        }}
                    >

                        <p className={"select-none"}>Reset</p>

                    </div>

                    <div
                        className={`flex flex-col items-center justify-center bg-[#${siteColor}dd] hover:bg-[#${siteColor}] border border-[#ffffff33] p-3 pt-1 pb-1 rounded-md cursor-pointer duration-200`}
                        onClick={() => {

                            setSaving(false);
                            onSave();

                        }}
                    >

                        <p className={"font-semibold select-none"}>Save</p>

                    </div>

                </div>

            </div>

        </>

    )

}