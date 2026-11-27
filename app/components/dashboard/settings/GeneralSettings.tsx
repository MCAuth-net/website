import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import {changeEmail, changeName, changePfp, confirmEmail, getUser, logout} from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Menu2fa from "@/app/components/2fa-menu/2fa";
import {ChangeEmailMenu} from "@/app/components/dashboard/change-menu/ChangeEmailMenu";

export default function GeneralSettings({ user, setUser, open, saving, setSaving, siteColor = getAccentColor(user) }: { user: Account, setUser: Dispatch<SetStateAction<Account | null>>, open: boolean, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>>, siteColor: string }) {

    const [defaultDisplayName, setDefaultDisplayName] = useState(user.display_name);
    const [displayName, setDisplayName] = useState(defaultDisplayName);
    const [editingDisplayName, setEditingDisplayName] = useState(false);

    const [defaultEmail, setDefaultEmail] = useState(user.email);
    const [email, setEmail] = useState(defaultEmail);
    const [editingEmail, setEditingEmail] = useState(false);
    const [emailPassword, setEmailPassword] = useState("");
    const [page, setPage] = useState(0);

    const [pfpFile, setPfpFile] = useState<File | null>(null);
    const [pfpPreview, setPfpPreview] = useState<string | null>(null);

    const split = defaultEmail ? defaultEmail.split("@") : null;

    useEffect(() => {

        if (
            displayName !== defaultDisplayName ||
            pfpFile !== null
        ) {

            setSaving(true);

        } else {

            if (open) setSaving(false);

        }

    }, [displayName, defaultDisplayName, pfpFile]);

    const handleSave = async () => {

        if (displayName !== user.display_name && displayName) {

            const displayNameChange = await changeName(displayName);
            setEditingDisplayName(false);

            if (!displayNameChange.success) {

                toast.error(displayNameChange.error || "Internal server error");
                handleReset();
                return;

            }

        }

        if (pfpFile !== null) {

            const pfpChange = await changePfp(pfpFile);
            if (!pfpChange.success) {

                toast.error(pfpChange.error || "Internal server error");
                handleReset();
                return;

            }

        }

        toast.success("Saved successfully!");
        setDefaultDisplayName(displayName);
        setPfpFile(null);

        setUser(await getUser());

    };

    const handleReset = () => {

        setDisplayName(user.display_name);
        setEditingDisplayName(false);

        if (pfpPreview) URL.revokeObjectURL(pfpPreview);
        setPfpFile(null);
        setPfpPreview(null);

    };

    const handlePfpChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {

            toast.error("Please select an image file.");
            return;

        }

        if (file.size > 2 * 1024 * 1024) {

            toast.error("Image must be smaller than 2 MB.");
            return;

        }

        if (pfpPreview) URL.revokeObjectURL(pfpPreview);

        setPfpFile(file);
        setPfpPreview(URL.createObjectURL(file));

        e.target.value = "";

    };

    return (

        <>

            <div className={`absolute flex flex-col gap-2 p-4 w-full h-min m-2 bg-[#1a1a1a] rounded-md shadow-md ${open ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>

                <div>

                    <h2 className={"text-2xl font-semibold"}>General</h2>
                    <p className={"text-sm text-white/70"}>Your general account settings, password, email, etc.</p>

                </div>

                <div className={"flex flex-row gap-2"}>

                    <div className={"relative cursor-pointer h-min"}>

                        <label
                            className={"cursor-pointer"}
                            htmlFor={"profile-picture-upload"}
                        >

                            <img
                                src={pfpPreview || (user.pfp ? "https://api.mcauth.net/v1/profile/pfp" : `https://nmsr.jgj52.dev/face/${user.uuid}?w=96`)}
                                alt={"Profile picture"}
                                className={"bg-[#1e1e1e] min-w-24 max-h-24 object-cover"}
                            />

                            <div className={"absolute bottom-0 right-0 flex flex-col items-center justify-center p-0.5 bg-[#1a1a1a]"}>

                                <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                            </div>

                        </label>

                    </div>

                    <div className={"flex flex-col gap-1 p-0 md:p-3"}>

                        <p className={"font-semibold text-sm"}>Profile Picture</p>
                        <p className={"text-sm text-white/70"}>Click the image to set your new avatar</p>

                        <label
                            htmlFor={"profile-picture-upload"}
                            className={"bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-fit cursor-pointer duration-200"}
                        >
                            Upload PFP
                        </label>

                        <input
                            id={"profile-picture-upload"}
                            type={"file"}
                            accept={"image/*"}
                            className={"hidden"}
                            onChange={handlePfpChange}
                        />

                    </div>

                </div>

                <div className={"flex flex-row justify-between items-center"}>

                    <p>Username</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={"text-white/70 select-none"}>{ user.name ? user.name.toLowerCase() : "Not set yet" }</p>

                        <a
                            className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}
                            href={"https://www.minecraft.net/en-us/msaprofile"}
                            target={"_blank"}
                        >

                            <GoogleIcon icon={"open_in_new"} className={"scale-80 select-none"} />

                        </a>

                    </div>

                </div>

                <div className={"flex flex-row justify-between items-center"}>

                    <p>Display name</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        {

                            editingDisplayName ?
                                (
                                    <input
                                        type={"text"}
                                        className={"input w-30 !border-white/10 !active:border-white/30"}
                                        placeholder={"Display name"}
                                        value={displayName || ""}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                )
                                :
                                (
                                    <p className={"text-white/70 select-none"}>{ defaultDisplayName || "Not set yet" }</p>
                                )

                        }

                        <div
                            className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}
                            onClick={() => {

                                setEditingDisplayName(!editingDisplayName);
                                setDisplayName(defaultDisplayName);

                            }}
                        >

                            <GoogleIcon icon={editingDisplayName ? "close" : "edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between items-center"}>

                    <p>Email</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={`text-white/70 select-none hover:blur-none duration-200`}>{ defaultEmail && split ? `${split[0].at(0)}${"*".repeat(Math.min(Math.max(split[0].length - 1, 0), 8))}@${split[1]}` : "Not set yet" }</p>

                        <div
                            className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}
                            onClick={() => {

                                setEditingEmail(true);
                                setEmail("");
                                setEmailPassword("");
                                setPage(0)

                            }}
                        >

                            <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between items-center"}>

                    <p>Password</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <div
                            className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] border border-[#ffffff22] p-1 rounded-md shadow-md cursor-pointer duration-200"}
                            onClick={() => {



                            }}
                        >

                            { user.password ? "Change password" : "Set password" }

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row gap-2"}>

                    <div
                        className={`flex flex-row gap-1 items-center bg-[#c83030dd] hover:bg-[#c83030] border border-[#ffffff22] rounded-md p-1 pr-2 duration-200 cursor-pointer`}
                        onClick={async () => {

                            await logout();
                            toast.success("Logged out!");

                            setTimeout(() => {

                                window.location.reload();

                            }, 1000);

                        }}
                    >

                        <GoogleIcon icon={"logout"} className={"select-none"} />

                        <p className={"select-none"}>Log out</p>

                    </div>

                    <div
                        className={"flex flex-row gap-1 items-center bg-[#c83030dd] hover:bg-[#c83030] border border-[#ffffff22] rounded-md p-1 pr-2 duration-200 cursor-pointer"}
                        onClick={async () => {



                        }}
                    >

                        <GoogleIcon icon={"delete"} className={"select-none"} />

                        <p className={"select-none"}>Delete account</p>

                    </div>

                </div>

            </div>

            { /*<Menu2fa user={user} siteColor={siteColor} /> */ }

            <ChangeEmailMenu
                user={user}
                defaultEmail={defaultEmail || ""}
                email={email || ""}
                setEmail={setEmail}
                setDefaultEmail={setDefaultEmail}
                emailPassword={emailPassword}
                setEmailPassword={setEmailPassword}
                editingEmail={editingEmail}
                setEditingEmail={setEditingEmail}
                page={page}
                setPage={setPage}
                siteColor={siteColor}
            />

            <SavingMenu saving={saving && open} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}