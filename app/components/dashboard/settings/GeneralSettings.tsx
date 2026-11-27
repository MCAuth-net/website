import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import {changeEmail, changeName, changePfp, confirmEmail, logout} from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Menu2fa from "@/app/components/2fa-menu/2fa";

const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function GeneralSettings({ user, open, saving, setSaving, siteColor = getAccentColor(user) }: { user: Account, open: boolean, saving: boolean, setSaving: Dispatch<SetStateAction<boolean>>, siteColor: string }) {

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

                            Change password

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

export function ChangeEmailMenu(
    {
        user,
        defaultEmail,
        email,
        setEmail,
        setDefaultEmail,
        emailPassword,
        setEmailPassword,
        editingEmail,
        setEditingEmail,
        page,
        setPage,
        siteColor
    }:
    {
        user: Account,
        defaultEmail: string,
        email: string,
        setEmail: Dispatch<SetStateAction<string | null>>;
        setDefaultEmail: Dispatch<SetStateAction<string | null>>;
        emailPassword: string,
        setEmailPassword: Dispatch<SetStateAction<string>>,
        editingEmail: boolean,
        setEditingEmail: Dispatch<SetStateAction<boolean>>,
        page: number,
        setPage: Dispatch<SetStateAction<number>>,
        siteColor: string
    }) {

    const [code, setCode] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [codeError, setCodeError] = useState(false);

    const hasPassword = !!emailPassword && emailPassword.length > 0;
    const noDefaultEmail = defaultEmail == null || defaultEmail === "";

    const isDataEntered =
        !!email &&
        emailCheck.test(email) &&
        defaultEmail.toLowerCase() !== email.toLowerCase() &&
        (hasPassword || noDefaultEmail);

    const isCodeEntered = code.length >= 6;
    const split = email?.split("@")

    const changeEmailHandler = async () => {

        setPage(-1);

        const request = await changeEmail(email, emailPassword);

        if (request.success) {

            setPage(1);
            toast.success("Email sent successfully.");

        } else {

            toast.error(request.error || "Failed to verify password, try again.");
            setEmailPassword("");
            setPage(0);
            setPasswordError(true);

        }

    };

    const confirmEmailHandler = async () => {

        setPage(-1);

        const request = await confirmEmail(code);
        setCode("");

        if (request.success) {

            setPage(2);
            setDefaultEmail(email);
            toast.success("New email set successfully");

        } else {

            toast.error(request.error || "Internal server error");
            setPage(1);
            setCodeError(true);

        }

    };

    return (

        <>

            <div
                className={`block fixed top-0 left-0 w-screen h-screen bg-black/50 z-100 cursor-pointer ${editingEmail ? "opacity-100" : "opacity-0 pointer-events-none"} transition-[opacity,h] duration-200 z-101`}
                onClick={() => {

                    setEditingEmail(false);

                }}
            ></div>

            <div className={
                     `fixed -bottom-300 right-[50%] translate-x-[50%] w-screen h-[85vh] md:bottom-[50%] md:right-[50%] md:translate-[50%] md:w-110 ${page == 0 || page == -1 ? "md:h-90" : page == 1 ? "md:h-80" : page == 2 ? "md:h-60" : ""} rounded-t-2xl md:rounded-xl shadow-xl shadow-[#00000033] bg-[#1e1e1e] z-101 ${editingEmail ? "opacity-100 bottom-0" : "opacity-0 -bottom-300 md:bottom-0 pointer-events-none"} transition-[opacity,bottom] md:transition-[opacity,height] duration-200 border border-[#ffffff22] overflow-hidden`
                 }>

                <div
                    className={"hidden md:flex flex-col items-center justify-center absolute top-3 right-3 rounded-full bg-transparent hover:bg-[#2e2e2e] h-10 w-10 duration-200 z-100"}
                    onClick={() => {

                        setEditingEmail(false);

                    }}
                >

                    <GoogleIcon icon={"close"} className={"text-white/50 scale-125 cursor-pointer select-none"} />

                </div>

                <div className={`absolute ${ page == 0 ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col gap-1 items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                    <div className={"flex flex-col gap-2"}>

                        <h1 className={"text-4xl md:text-[27px] font-semibold"}>Set your new email</h1>
                        <p className={"text-[17px] font-semibold"}>Enter the new email address for your account. <br /> We&#39;ll send a code to confirm it&#39;s yours.</p>

                    </div>

                    <div className={"flex flex-col gap-2 items-center mt-13 md:mt-1 mb-10 md:mb-3 scale-125 md:scale-100"}>

                        <label className={"flex flex-col"}>

                            <div className={"flex flex-row gap-2 items-center justify-between"}>

                                <p className={"text-md"}>New email</p>

                                <p className={`font-bold text-sm text-[#ff7777] ${email.toLowerCase() === defaultEmail.toLowerCase() ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>Set a new email</p>

                            </div>

                            <input
                                type={"email"}
                                className={`input ${email.toLowerCase() === defaultEmail.toLowerCase() ? "!border-[#ff7777] !active:border-[#ffffff66]" : "!border-[#ffffff22] !active:border-[#ffffff66]"} !p-2 !pl-3 !pr-3 !rounded-lg`}
                                value={email || ""}
                                placeholder={"example@mcauth.net"}
                                onChange={(e) => { setEmail(e.target.value); }}
                            />

                        </label>

                        { defaultEmail != null && defaultEmail != "" && <div className={"relative flex flex-col"}>

                            <div className={"flex flex-row gap-2 items-center justify-between"}>

                                <p className={"text-md"}>Password</p>

                                <p className={`font-bold text-sm text-[#ff7777] ${passwordError ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>Invalid password</p>

                            </div>

                            <input
                                type={"password"}
                                className={`input ${passwordError ? "!border-[#ff7777] !active:border-[#ffffff66]" : "!border-[#ffffff22] !active:border-[#ffffff66]"} !p-2 !pl-3 !pr-3 !rounded-lg`}
                                value={emailPassword || ""}
                                placeholder={"Your password"}
                                onChange={(e) => {

                                    setEmailPassword(e.target.value);

                                    if (passwordError) setPasswordError(false);

                                }}
                            />

                        </div> }

                    </div>

                    <div className={"flex flex-row gap-2 justify-between w-full"}>

                        <div
                            className={`flex flex-col items-center justify-center ${isDataEntered ? `bg-[#${siteColor}dd] hover:bg-[#${siteColor}] cursor-pointer` : "bg-[#262626] cursor-not-allowed"} border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full duration-200`}
                            onClick={async () => {

                                if (!isDataEntered) return;

                                await changeEmailHandler();

                            }}
                        >

                            <p className={"text-lg font-semibold select-none"}>Next</p>

                        </div>

                        <div
                            className={`flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}
                            onClick={() => {

                                setEditingEmail(false);

                            }}
                        >

                            <p className={"text-lg select-none"}>Cancel</p>

                        </div>

                    </div>

                </div>

                <div className={`absolute ${ page == 1 ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col gap-5 items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                    <div className={"flex flex-col gap-2"}>

                        <h1 className={"text-4xl md:text-[27px] font-semibold"}>Confirm your email</h1>
                        <p className={"text-[17px] font-semibold"}>We&#39;ve sent an email to <span className={`text-white/90`}>{ `${split[0].at(0)}${"*".repeat(Math.min(Math.max(split[0].length - 1, 0), 8))}@${split[1]}` }</span>. <br/> Please enter the code you received.</p>

                    </div>

                    <div className={"flex flex-col gap-1 w-full"}>

                        <div className={"flex flex-row gap-2 items-center justify-between"}>

                            <p className={"text-md"}>Enter Received Auth Code</p>

                            <p className={`font-bold text-sm text-[#ff7777] ${codeError ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>Invalid code</p>

                        </div>

                        <div className={"flex flex-row gap-2"}>

                            <input
                                type={"text"}
                                className={`input ${codeError ? "!border-[#ff7777] !active:border-[#ffffff66]" : "!border-[#ffffff22] !active:border-[#ffffff66]"} !p-2 !pl-3 !pr-3 !rounded-lg`}
                                inputMode={"numeric"}
                                pattern={"[0-9]*"}
                                value={code || ""}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                                maxLength={6}
                                placeholder={"6-digit authentication code"}
                            />

                            <div
                                className={"flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200"}
                            >

                                <p className={"text-[16px] select-none"}>Resend email?</p>

                            </div>

                        </div>

                    </div>

                    <div className={"flex flex-row gap-2 justify-between w-full"}>

                        <div
                            className={`flex flex-col items-center justify-center ${isCodeEntered ? `bg-[#${siteColor}dd] hover:bg-[#${siteColor}] cursor-pointer` : "bg-[#262626] cursor-not-allowed"} border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full duration-200`}
                            onClick={async () => {

                                if (!isCodeEntered) return;

                                await confirmEmailHandler();

                            }}
                        >

                            <p className={"text-lg font-semibold select-none"}>Confirm</p>

                        </div>

                        <div
                            className={`flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}
                            onClick={() => {

                                setPage(0);
                                setEmailPassword("");

                            }}
                        >

                            <p className={"text-lg select-none"}>Back</p>

                        </div>

                    </div>

                </div>

                <div className={`absolute ${ page == 2 ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col gap-10 items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                    <div className={"flex flex-col gap-2"}>

                        <h1 className={"text-4xl md:text-[27px] font-semibold"}>Your email has been set!</h1>
                        <p className={"text-[17px] font-semibold"}>Your new email has been set successfully! <br /> If something breaks, please refresh the site!</p>

                    </div>

                    <div className={"flex flex-row gap-2 justify-between w-full"}>

                        <div
                            className={`flex flex-col items-center justify-center bg-[#${siteColor}dd] hover:bg-[#${siteColor}] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}
                            onClick={async () => {

                                setEditingEmail(false);

                                setTimeout(() => {

                                    setPage(0);

                                }, 200);

                            }}
                        >

                            <p className={"text-lg font-semibold select-none"}>Close</p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}