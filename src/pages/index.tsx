import type { ReactElement } from "react"
import { cubicBezier } from "~/utils/constants"
import { WAIconLogo } from "~/components/WALogos"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Head from "next/head"

const Home = () => {
    const { status } = useSession()
    const router = useRouter()

    if (status === "loading") {
        return (
            <main className="flex h-screen items-center justify-center">
                <motion.div
                    initial={{ width: "150px", height: "150px" }}
                    animate={{ scale: 1.5 }}
                    transition={{ ease: cubicBezier, duration: 0.1 }}
                >
                    <WAIconLogo className="h-full w-full" />
                </motion.div>
            </main>
        )
    }

    if (status === "unauthenticated") {
        void router.push("/welcome")
    }

    if (status === "authenticated") {
        void router.push("/home")
    }

    return (
        <>
            <Head>
                <title>Waste-Aid</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>
}

export default Home
