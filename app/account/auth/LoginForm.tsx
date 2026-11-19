export default function LoginForm() {

    return (

        <form className={"flex flex-col gap-2 items-center"}>

            <div className={"flex flex-col"}>

                <p className={"text-lg self-start"}>Username or email</p>

                <input
                    type={"text"}
                    className={"input w-70 text-lg"}
                    maxLength={16}
                    name={"username"}
                />

            </div>

            <div className={"flex flex-col"}>

                <p className={"text-lg self-start"}>Password</p>

                <input
                    type={"password"}
                    className={"input w-70"}
                    name={"password"}
                />

            </div>

            <button
                className={"flex flex-row gap-2 justify-center items-center mt-2 button-primary pr-3 pl-3 pt-1 pb-1 !text-white rounded-sm cursor-pointer text-[23px] duration-200"}
            >

                Log in

            </button>

        </form>

    )

}