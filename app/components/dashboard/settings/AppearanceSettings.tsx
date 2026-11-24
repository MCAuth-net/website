import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import {getAccentColor, getColorName} from "@/app/lib/settings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {changeColor} from "@/app/lib/calls";

export default function AppearanceSettings({ user, saving, setSaving }: { user: Account, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>> }) {

    const [selected, setSelected] = useState(getAccentColor(user));

    const defaultColor = getAccentColor(user);

    useEffect(() => {

        if (
            defaultColor !== selected
        ) {

            setSaving(true);

        } else {

            setSaving(false);

        }

    })

    const colors = [
        { name: "Green", value: "3c8527" },
        { name: "Blue", value: "3c5ccc" },
        { name: "Teal", value: "1f9c8f" },
        { name: "Violet", value: "7a3cc8" },
        { name: "Pink", value: "e05c9c" },
        { name: "Yellow", value: "f0c020" },
        { name: "Red", value: "c83030" },
        { name: "Grey", value: "8a8a8a" },
    ];

    const handleSave = async () => {

        const colorName = getColorName(selected);

        const colorChange = await changeColor(colorName);

        if (!colorChange) {

            setSelected(defaultColor);
            setSaving(false);

            toast.error("Saving unsuccessful");

        } else {

            setSaving(false);
            toast.success("Saved successfully!");

        }

    };

    const handleReset = () => {

        setSelected(defaultColor);

    };

    return (

        <>

            <div className={"flex flex-col gap-2 bg-[#1a1a1a] rounded-md shadow-md p-4 md:w-full h-min m-2"}>

                <div>

                    <h2 className={"text-2xl font-semibold"}>Appearance</h2>
                    <p className={"text-sm text-white/70"}>Make the website look exactly how you want it</p>

                </div>

                <div className={"flex flex-col gap-1 mt-3"}>

                    <p className={"text-lg font-semibold"}>Accent color</p>

                    <div className={"flex flex-row gap-1"}>

                        {

                            colors.map((color, index) => (

                                <div
                                    className={"flex flex-col items-center justify-center w-15"}
                                    key={index}
                                >

                                    <div
                                        className={`w-10 h-10 border-2 bg-[#${color.value}] rounded-full cursor-pointer`}
                                        onClick={() => {

                                            setSelected(color.value);

                                        }}
                                        style={{ borderColor: color.value == selected ? "#ffffff66" : "#00000066"}}
                                    ></div>

                                    <p className={"text-sm font-semibold select-none"}>{ color.name }</p>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

            <SavingMenu saving={saving} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}