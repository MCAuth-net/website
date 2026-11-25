import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import SavingMenu from "@/app/components/saving/SavingMenu";
import { Account } from "@/app/lib/types";
import {changeEmail, changeName, changePfp, confirmEmail, logout} from "@/app/lib/calls";
import { getAccentColor } from "@/app/lib/settings";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

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
                            className={"bg-[#262626] hover:bg-[#2e2e2e] p-1 pr-2 pl-2 rounded-sm text-sm w-23 cursor-pointer duration-200"}
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

                <div className={"flex flex-row justify-between mt-1"}>

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

                <div className={"flex flex-row justify-between mt-1"}>

                    <p>Username</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={"text-white/70 select-none"}>{ user.name ? user.name.toLowerCase() : "Not set yet" }</p>

                        <div className={"flex flex-col items-center justify-center bg-[#212121] hover:bg-[#262626] p-1 rounded-md shadow-md cursor-pointer duration-200"}>

                            <GoogleIcon icon={"edit"} className={"scale-80 select-none"} />

                        </div>

                    </div>

                </div>

                <div className={"flex flex-row justify-between mt-1"}>

                    <p>Email</p>

                    <div className={"flex flex-row gap-3 items-center"}>

                        <p className={`text-white/70 select-none ${user.email ? "blur-[4.5px]" : ""} hover:blur-none duration-200`}>{ defaultEmail || "Not set yet" }</p>

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

                <div className={"flex flex-row justify-between"}>

                    <div
                        className={`flex flex-row gap-1 items-center bg-[#${getAccentColor(user)}dd] hover:bg-[#${getAccentColor(user)}] rounded-md p-1 pr-2 duration-200 cursor-pointer`}
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

                </div>

            </div>

            <div
                className={`block fixed top-0 left-0 w-screen h-screen bg-black/5 z-100 backdrop-blur-xs cursor-pointer ${editingEmail ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200`}
                onClick={() => {

                    setEditingEmail(false);

                }}
            ></div>

            <ChangeEmailMenu
                user={user}
                defaultEmail={defaultEmail || ""}
                email={email || ""}
                setEmail={setEmail}
                emailPassword={emailPassword}
                setEmailPassword={setEmailPassword}
                editingEmail={editingEmail}
                setEditingEmail={setEditingEmail}
                page={page}
                setPage={setPage}
            />

            <SavingMenu saving={saving && open} setSaving={setSaving} onSave={handleSave} onReset={handleReset} user={user} />

        </>

    )

}

export function ChangeEmailMenu({ user, defaultEmail, email, setEmail, emailPassword, setEmailPassword, editingEmail, setEditingEmail, page, setPage }: { user: Account, defaultEmail: string, email: string, setEmail: Dispatch<SetStateAction<string | null>>; emailPassword: string, setEmailPassword: Dispatch<SetStateAction<string>>, editingEmail: boolean, setEditingEmail: Dispatch<SetStateAction<boolean>>, page: number, setPage: Dispatch<SetStateAction<number>> }) {

    const [code, setCode] = useState("");

    const hasPassword = !!emailPassword && emailPassword.length > 0;
    const noDefaultEmail = defaultEmail == null || defaultEmail === "";

    const isDataEntered =
        !!email &&
        emailCheck.test(email) &&
        defaultEmail !== email &&
        (hasPassword || noDefaultEmail);

    const isCodeEntered = code.length >= 6;

    const changeEmailHandler = async () => {

        setPage(-1);

        const request = await changeEmail(email, emailPassword);

        if (request.success) {

            setPage(1);
            toast.success("Email sent successfully.");

        } else {

            toast.error("Failed to verify password, try again.");
            setEmailPassword("");
            setPage(0);

        }

    };

    const confirmEmailHandler = async () => {

        setPage(-1);

        const request = await confirmEmail(code);
        setCode("");

        if (request.success) {

            setPage(2);
            toast.success("New email set successfully");

        } else {

            toast.error(request.error || "Internal server error");
            setPage(0);

        }

    };

    return (

        <div className={
            `fixed -bottom-300 right-[50%] translate-x-[50%] w-screen h-[85vh] md:bottom-[50%] md:right-[50%] md:translate-[50%] md:w-135 md:h-100 rounded-t-2xl md:rounded-xl shadow-xl shadow-[#00000033] bg-[#1e1e1e] z-101 ${editingEmail ? "md:opacity-100 bottom-0" : "md:opacity-0 -bottom-300 md:bottom-0 pointer-events-none"} transition-[opacity,bottom] md:transition-opacity duration-200 border border-[#ffffff22] overflow-hidden`
        }>

            <div
                className={"hidden md:flex flex-col items-center justify-center absolute top-3 right-3 rounded-full bg-transparent hover:bg-[#2e2e2e] h-10 w-10 duration-200 z-100"}
                onClick={() => {

                    setEditingEmail(false);

                }}
            >

                <GoogleIcon icon={"close"} className={"text-white/50 scale-125 cursor-pointer select-none"} />

            </div>

            <div className={`absolute ${ page == 0 ? "top-0 opacity-100" : "top-150 opacity-0 pointer-events-none"} flex flex-col items-center md:p-10 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                <h1 className={"text-4xl md:text-5xl font-semibold"}>Set your new email</h1>
                <p className={"text-white/70 mr-2.5 ml-2.5"}>Enter your new email bellow, and your password, so we know it&#39;s actually you.</p>

                <div className={"flex flex-col gap-4 items-center mt-13 md:mt-4 scale-125 md:scale-100"}>

                    <label className={"flex flex-col"}>

                        <p className={"text-md"}>New email:</p>

                        <input
                            type={"email"}
                            className={"input !border-[#ffffff22] !active:border-[#ffffff66] p-1"}
                            value={email || ""}
                            onChange={(e) => { setEmail(e.target.value); }}
                        />

                    </label>

                    { defaultEmail != null && defaultEmail != "" && <label className={"flex flex-col"}>

                        <p className={"text-md"}>Password:</p>

                        <input
                            type={"password"}
                            className={"input !border-[#ffffff22] !active:border-[#ffffff66] p-1"}
                            value={emailPassword || ""}
                            onChange={(e) => { setEmailPassword(e.target.value); }}
                        />

                    </label> }

                    <div
                        className={`flex flex-col items-center justify-center ${isDataEntered ? `bg-[#${getAccentColor(user)}] cursor-pointer` : "bg-zinc-600 cursor-not-allowed"} duration-200 p-2 pb-1 mt-3 rounded-md shadow-md scale-125 select-none`}
                        onClick={async () => {

                            if (!isDataEntered) return;

                            await changeEmailHandler();

                        }}
                    >

                        <p className={"font-semibold leading-none"}>Next</p>

                    </div>

                </div>

            </div>

            <div className={`absolute ${ page == 1 ? "top-0 opacity-100" : "top-150 opacity-0 pointer-events-none"} flex flex-col items-center md:p-10 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                <h1 className={"text-4xl md:text-5xl font-semibold"}>Confirm your email</h1>
                <p className={"text-white/70 mr-2.5 ml-2.5"}>Enter the code from the email we sent you, to verify your ownership.</p>

                <div className={"flex flex-col gap-4 items-center mt-13 md:mt-4 scale-125 md:scale-100"}>

                    <label className={"flex flex-col items-center lg:scale-120"}>

                        <p className={"text-md"}>Code</p>

                        <input
                            type={"text"}
                            className={"input !border-[#ffffff22] !active:border-[#ffffff66] p-1 text-center"}
                            inputMode={"numeric"}
                            pattern={"[0-9]*"}
                            value={code || ""}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            maxLength={6}
                        />

                    </label>

                    <div
                        className={`flex flex-col items-center justify-center ${isCodeEntered ? `bg-[#${getAccentColor(user)}] cursor-pointer` : "bg-zinc-600 cursor-not-allowed"} duration-200 p-2 pb-1 mt-3 rounded-md shadow-md scale-125 select-none`}
                        onClick={async () => {

                            if (!isCodeEntered) return;

                            await confirmEmailHandler();

                        }}
                    >

                        <p className={"font-semibold leading-none"}>Confirm</p>

                    </div>

                </div>

            </div>

            <div className={`absolute ${ page == 2 ? "top-0 opacity-100" : "top-150 opacity-0 pointer-events-none"} flex flex-col items-center md:p-10 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                <h1 className={"text-4xl md:text-5xl font-semibold"}>Your email is ready</h1>
                <p className={"text-white/70 mr-2.5 ml-2.5"}>Your email has been set successfully!</p>

                <div className={"flex flex-col gap-4 items-center mt-13 md:mt-4 scale-125 md:scale-100"}>

                    <div
                        className={`flex flex-col items-center justify-center bg-[#${getAccentColor(user)}] cursor-pointer duration-200 p-2 pb-1 mt-3 rounded-md shadow-md scale-125 select-none`}
                        onClick={() => {

                            setEditingEmail(false);
                            setPage(0);

                        }}
                    >

                        <p className={"font-semibold leading-none"}>Close</p>

                    </div>

                </div>

            </div>

        </div>

    )

}