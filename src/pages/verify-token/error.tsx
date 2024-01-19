import type { FC } from "react"
import { useSearchParams } from "next/navigation"
import { cubicBezier } from "~/utils/constants"
import { WAFullLogo } from "~/components/WALogos"
import { motion } from "framer-motion"
import Link from "next/link"

const placeholderImages = {
    "403": { src: "/already-scanned.svg", alt: "QRcode already scanned" },
    "401": { src: "/unauthorized.svg", alt: "Unauthorized scan" },
}

interface IErrorProps {}
const Error: FC<IErrorProps> = () => {
    const { get } = useSearchParams()
    const code = get("code") as keyof typeof placeholderImages
    const message = get("message")

    return (
        <main
            key={"error"}
            className="flex h-screen flex-col items-center gap-8 p-5"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.5, delay: 0.2 }}
            >
                <WAFullLogo className="my-4 block h-[36px] w-fit pl-4 md:hidden" />
            </motion.div>

            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.3, delay: 0.3 }}
                src={placeholderImages[code]?.src}
                alt={placeholderImages[code]?.alt}
                className="w-3/4 md:w-1/2"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.3, delay: 0.4 }}
                className="text-lg font-medium"
            >
                {message}
            </motion.p>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.3, delay: 0.5 }}
            >
                <Link href={"/verify-token"} className="btn-primary mt-12">
                    Go Back
                </Link>
            </motion.span>
        </main>
    )
}

export default Error
