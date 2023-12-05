import type { FC } from "react"
import { Flashlight, FlashlightOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useZxing } from "react-zxing"
import { useState } from "react"
import { motion } from "framer-motion"
import { api } from "~/utils/api"

interface IVerifyToken {}
const VerifyToken: FC<IVerifyToken> = () => {
    const router = useRouter()
    const { mutate, isLoading } = api.donation.verifyDonation.useMutation()
    const [qrCodeScanned, setQrCodeScanned] = useState(false)

    const serializeObjectToQueryParams = (
        obj: Record<string, string | number>
    ) => {
        const params = new URLSearchParams()

        // Iterate through object properties and append them to URLSearchParams
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key]
                // Ensure the value is defined and not null
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString())
                }
            }
        }

        return params.toString()
    }

    const {
        ref,
        torch: { on, off, status },
    } = useZxing({
        onDecodeResult(result) {
            if (qrCodeScanned) return

            setQrCodeScanned(true)
            mutate(
                { donation_id: result.getText() },
                {
                    onSuccess(data) {
                        const queryParams = serializeObjectToQueryParams(data)
                        router.push(`/verify-token/success?${queryParams}`)
                    },
                    onError(error) {
                        const queryParams = serializeObjectToQueryParams({
                            message: error.message,
                            code: error.shape?.data.httpStatus ?? 0,
                        })
                        router.push(`/verify-token/error?${queryParams}`)
                    },
                }
            )
        },
    })

    return (
        <motion.main
            key={"verify-token"}
            className="p-5"
            initial={{ translateX: "0%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "-100%" }}
        >
            <div
                aria-label="QR Code scanner wrapper"
                className="relative w-full overflow-hidden rounded-3xl md:mx-auto md:w-1/2"
            >
                <video
                    ref={ref}
                    aria-label="QR Code scanner cam"
                    className="aspect-square w-full rounded-3xl object-fill"
                />
                <div className="absolute left-8 top-8 z-[2] h-1/6 w-1/6 border-l-4 border-t-4 border-primary opacity-80" />
                <div className="absolute right-8 top-8 z-[2] h-1/6 w-1/6 border-r-4 border-t-4 border-primary opacity-80" />
                <div className="absolute bottom-8 left-8 z-[2] h-1/6 w-1/6 border-b-4 border-l-4 border-primary opacity-80" />
                <div className="absolute bottom-8 right-8 z-[2] h-1/6 w-1/6 border-b-4 border-r-4 border-primary opacity-80" />

                {isLoading && (
                    <div className="z-1 absolute inset-0 flex items-center justify-center bg-black opacity-75">
                        <span className="loader loader-primary loader-xl" />
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center p-5 md:hidden">
                {status !== "unavailable" ? (
                    <button>
                        {status === "off" && (
                            <Flashlight
                                color="#333"
                                className="h-10 w-10 rounded-full border border-gray-700 bg-primary p-2"
                                onClick={() => void on()}
                            />
                        )}
                        {status === "on" && (
                            <FlashlightOff
                                color="#333"
                                onClick={() => void off()}
                                className="h-10 w-10 rounded-full border border-gray-700 p-2"
                            />
                        )}
                    </button>
                ) : null}
            </div>
        </motion.main>
    )
}

export default VerifyToken
