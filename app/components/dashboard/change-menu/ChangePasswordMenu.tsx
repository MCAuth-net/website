import GoogleIcon from "@/app/components/icons/GoogleIcon";
import toast from "react-hot-toast";
import { changePassword } from "@/app/lib/calls";
import { Account } from "@/app/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import Tooltip from "@/app/components/tooltip/Tooltip";

const passwordRegex = /^[A-Za-z0-9!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]*$/;
const passwordSendRegex = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\p{Nd})(?=.*[\p{P}\p{S}])[\s\S]{8,64}$/u;

export default function ChangePasswordMenu(
    {
        user,
        editingPassword,
        setEditingPassword,
        page,
        setPage,
        siteColor
    }:
    {
        user: Account,
        editingPassword: boolean,
        setEditingPassword: Dispatch<SetStateAction<boolean>>,
        page: number,
        setPage: Dispatch<SetStateAction<number>>,
        siteColor: string
    }) {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const isDataEntered =
        passwordSendRegex.test(newPassword) &&
        (!user.password || (oldPassword.length > 0 && oldPassword !== newPassword));

    const changePasswordHandler = async () => {

        setPage(-1);

        const request = await changePassword(oldPassword, newPassword);

        if (request.success) {

            setPage(1);
            toast.success("Email sent successfully.");
            setOldPassword("");
            setNewPassword("");

        } else {

            toast.error(request.error || "Failed to verify password, try again.");
            setPage(0);
            setPasswordError(true);
            setOldPassword("");
            setNewPassword("");

        }

    }

    const handleClose = () => {

        setTimeout(() => {

            setOldPassword("");
            setNewPassword("");
            setPage(0);
            setPasswordError(false);

        }, 200);

    }

    return (

        <>

            <div
                className={`block fixed top-0 left-0 w-screen h-screen bg-black/50 z-100 cursor-pointer ${editingPassword ? "opacity-100" : "opacity-0 pointer-events-none"} transition-[opacity,h] duration-200 z-101`}
                onClick={() => {

                    setEditingPassword(false);
                    handleClose();

                }}
            ></div>

            <div className={
                     `fixed -bottom-300 right-[50%] translate-x-[50%] w-screen h-[85vh] md:bottom-[50%] md:right-[50%] md:translate-[50%] md:w-110 ${page == 0 || page == -1 ? user.password && user.email ? "md:h-90" : "md:h-70" : page == 1 ? "md:h-60" : ""} rounded-t-2xl md:rounded-xl shadow-xl shadow-[#00000033] bg-[#1e1e1e] z-101 ${editingPassword ? "opacity-100 bottom-0" : "opacity-0 -bottom-300 md:bottom-0 pointer-events-none"} transition-[opacity,bottom] md:transition-[opacity,height] duration-200 border border-[#ffffff22]`
                 }>

                <div
                    className={"hidden md:flex flex-col items-center justify-center absolute top-3 right-3 rounded-full bg-transparent hover:bg-[#2e2e2e] h-10 w-10 duration-200 z-100"}
                    onClick={() => {

                        setEditingPassword(false);
                        handleClose()

                    }}
                >

                    <GoogleIcon icon={"close"} className={"text-white/50 scale-125 cursor-pointer select-none"} />

                </div>

                <div className={`absolute ${ page == 0 ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col gap-1 items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                    <div className={"flex flex-col gap-2"}>

                        <h1 className={"text-4xl md:text-[27px] font-semibold"}>Set your new password</h1>
                        <p className={"text-[17px] font-semibold"}>Use 8-64 characters with an uppercase letter, a lowercase letter, a number, and a symbol.</p>

                    </div>

                    <div className={"flex flex-col gap-2 items-center mt-13 md:mt-1 mb-10 md:mb-3 scale-125 md:scale-100"}>

                        { user.password && <div className={"flex flex-col"}>

                                <div className={"flex flex-row gap-2 items-center justify-between"}>

                                    <p className={"text-md"}>Current Password</p>

                                    <p className={`font-bold text-sm text-[#ff7777] ${passwordError ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>Invalid password</p>

                                </div>

                                <input
                                    type={"password"}
                                    className={`input ${passwordError ? "!border-[#ff7777] !active:border-[#ffffff66]" : "!border-[#ffffff22] !active:border-[#ffffff66]"} !p-2 !pl-3 !pr-3 !rounded-lg`}
                                    value={oldPassword || ""}
                                    placeholder={"Your Current password"}
                                    onChange={(e) => {

                                        const value = e.target.value;

                                        if (passwordRegex.test(value)) {
                                            setOldPassword(value);
                                        }

                                    }}
                                />

                        </div> }

                        <div className={"flex flex-col"}>

                            <div className={"flex flex-row gap-2 items-center justify-between"}>

                                <p className={"text-md"}>New Password</p>

                                <p className={`font-bold text-sm text-[#ff7777] ${passwordError ? "opacity-100" : "opacity-0 pointer-events-none"} duration-200 transition-opacity`}>Invalid password</p>

                            </div>

                            <input
                                type={"password"}
                                className={`input ${passwordError ? "!border-[#ff7777] !active:border-[#ffffff66]" : "!border-[#ffffff22] !active:border-[#ffffff66]"} !p-2 !pl-3 !pr-3 !rounded-lg`}
                                value={newPassword || ""}
                                placeholder={"Your Current password"}
                                onChange={(e) => {

                                    const value = e.target.value;

                                    if (passwordRegex.test(value)) {

                                        setNewPassword(value);

                                    }

                                }}
                            />

                        </div>

                    </div>

                    <div className={"flex flex-row gap-2 justify-between w-full"}>

                        <div
                            className={`flex flex-col items-center justify-center ${isDataEntered ? `bg-[#${siteColor}dd] hover:bg-[#${siteColor}] cursor-pointer` : "bg-[#262626] cursor-not-allowed"} border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full duration-200`}
                            onClick={async () => {

                                if (!isDataEntered) return;

                                await changePasswordHandler();

                            }}
                        >

                            <p className={"text-lg font-semibold select-none"}>Next</p>

                        </div>

                        <div
                            className={`flex flex-col items-center justify-center bg-[#262626] hover:bg-[#2e2e2e] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}
                            onClick={() => {

                                setEditingPassword(false);
                                handleClose();

                            }}
                        >

                            <p className={"text-lg select-none"}>Cancel</p>

                        </div>

                    </div>

                </div>

                <div className={`absolute ${ page == 1 ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col justify-between items-center md:items-start md:p-8 md:pl-7 md:pr-7 md:mt-2 p-7 w-full h-full transition-[top,opacity] duration-300`}>

                    <div className={"flex flex-col gap-2"}>

                        <h1 className={"text-4xl md:text-[27px] font-semibold"}>Your new password is set!</h1>
                        <p className={"text-[17px] font-semibold"}>All other sessions have been logged out. <br /> Refresh the site if something breaks.</p>

                    </div>

                    <div className={"flex flex-row gap-2 justify-between w-full"}>

                        <div
                            className={`flex flex-col items-center justify-center bg-[#${siteColor}dd] hover:bg-[#${siteColor}] border border-[#ffffff22] p-1 pr-2 pl-2 rounded-md text-sm w-full cursor-pointer duration-200`}
                            onClick={async () => {

                                setEditingPassword(false);

                                handleClose();

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