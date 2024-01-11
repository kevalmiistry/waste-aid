import { useState, type FC, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { cubicBezier } from "~/utils/constants"
import { motion } from "framer-motion"
import Link from "next/link"

interface ISuccessProps {}
const Success: FC<ISuccessProps> = () => {
    const { get } = useSearchParams()
    const endNumber = Number(get("newAmount"))
    const [startNumber, setStartNumber] = useState(Number(get("oldAmount")))
    const amountType = get("amountType")

    useEffect(() => {
        const animationDuration = 200
        const startTime = Date.now()

        const updateNumber = () => {
            const currentTime = Date.now()
            const elapsed = currentTime - startTime

            if (elapsed < animationDuration) {
                const percentage = elapsed / animationDuration
                const newNumber = Math.floor(
                    startNumber + (endNumber - startNumber) * percentage
                )
                setStartNumber(newNumber)
                requestAnimationFrame(updateNumber)
            } else {
                setStartNumber(endNumber)
            }
        }

        updateNumber()
    }, [startNumber, endNumber])

    return (
        <main
            key={"success"}
            className="flex h-screen flex-col items-center gap-8 p-5"
        >
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.5, delay: 0 }}
                src="/success.svg"
                alt="Success"
                className="w-3/4 md:w-1/2"
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.5, delay: 0.1 }}
                className="text-lg font-medium"
            >
                QR Code scanned Successfully! 🙌
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.5, delay: 0.2 }}
                className="number-animation flex items-center gap-2"
            >
                <span className="font-satoshi rounded-md bg-gray-200 px-3 py-1 text-2xl font-semibold">
                    {startNumber}
                </span>{" "}
                <span className="font-light">
                    <span className="uppercase">{amountType}</span> collected!
                </span>
            </motion.div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: cubicBezier, duration: 0.5, delay: 0.3 }}
            >
                <Link href={"/verify-token"} className="btn-primary mt-12">
                    Go Back
                </Link>
            </motion.span>
        </main>
    )
}

export default Success
