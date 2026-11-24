import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import { getAccentColor, getColorName } from "@/app/lib/settings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { changeColor } from "@/app/lib/calls";

export default function AppearanceSettings({ user, open, saving, setSaving }: { user: Account, open: boolean, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>> }) {

    const [accentColor, setAccentColor] = useState(getAccentColor(user));
    const [selected, setSelected] = useState(accentColor);

    useEffect(() => {

        if (
            accentColor !== selected
        ) {

            setSaving(true);

        } else {

            if (open) setSaving(false);

        }

    }, [selected, accentColor]);

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

            setSelected(accentColor);
            toast.error("Saving unsuccessful");

        } else {

            toast.success("Saved successfully!");
            setAccentColor(selected);

        }

    };

    const handleReset = () => {

        setSelected(accentColor);

    };

    return (

        <>

            <div className={`absolute flex flex-col gap-2 p-4 w-full h-min m-2 bg-[#1a1a1a] rounded-md shadow-md ${open ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>

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

            <SavingMenu saving={saving && open} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}