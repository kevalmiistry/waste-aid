import { signIn } from "next-auth/react"
import type { ReactElement } from "react"
import type { NextPageWithLayout } from "../_app"

interface IAuth {}
const Auth: NextPageWithLayout<IAuth> = () => {
    return (
        <section className="mt-5 flex justify-center">
            <button
                className="rounded-lg border-[2px] border-black bg-green-400 px-3 py-2 font-medium text-black"
                onClick={() => void signIn("google", { callbackUrl: "/" })}
            >
                SignIn
            </button>
        </section>
    )
}

Auth.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>
}

export default Auth
