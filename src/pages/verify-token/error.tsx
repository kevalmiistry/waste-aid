import type { FC } from "react"
import { useSearchParams } from "next/navigation"
import { cubicBezier } from "~/utils/constants"
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
        <motion.main
            key={"error"}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: "0%" }}
            transition={{ ease: cubicBezier }}
            className="flex h-screen flex-col items-center gap-8 p-5"
        >
            <img
                src={placeholderImages[code].src}
                alt={placeholderImages[code].alt}
                className="w-3/4 md:w-1/2"
            />
            <p className="text-lg font-medium">{message}</p>
            <Link href={"/verify-token"} className="btn-primary mt-12">
                Go Back
            </Link>
        </motion.main>
    )
}

export default Error
