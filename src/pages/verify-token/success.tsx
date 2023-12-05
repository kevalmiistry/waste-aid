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
        <motion.main
            key={"success"}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: "0%" }}
            transition={{ ease: cubicBezier }}
            className="flex h-screen flex-col items-center gap-8 p-5"
        >
            <img src="/success.svg" alt="Success" className="w-3/4 md:w-1/2" />
            <p className="text-lg font-medium">
                QR Code scanned Successfully! 🙌
            </p>
            <div className="number-animation flex items-center gap-2">
                <span className="font-satoshi rounded-md bg-gray-200 px-3 py-1 text-2xl font-semibold">
                    {startNumber}
                </span>{" "}
                <span className="font-light">
                    <span className="uppercase">{amountType}</span> collected!
                </span>
            </div>
            <Link href={"/verify-token"} className="btn-primary mt-12">
                Go Back
            </Link>
        </motion.main>
    )
}

export default Success
