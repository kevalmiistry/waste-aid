import type { FC } from "react"
import { Flashlight, FlashlightOff } from "lucide-react"
import { cubicBezier } from "~/utils/constants"
import { WAFullLogo } from "~/components/WALogos"
import { useRouter } from "next/navigation"
import { useZxing } from "react-zxing"
import { useState } from "react"
import { motion } from "framer-motion"
import { api } from "~/utils/api"
import Head from "next/head"

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
        <>
            <Head>
                <title>Waste-Aid | Scan QR</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <motion.main
                key={"verify-token"}
                className="px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, position: "absolute" }}
                transition={{ ease: cubicBezier, duration: 0.5 }}
            >
                <WAFullLogo className="my-4 block h-[36px] w-fit pl-4 md:hidden" />

                <h1 className="mb-2 border-t pt-4 text-2xl font-medium">
                    Scan QR Code
                </h1>
                <div
                    aria-label="QR Code scanner wrapper"
                    className="relative w-full overflow-hidden rounded-3xl md:mx-auto md:w-1/2"
                >
                    <video
                        ref={ref}
                        aria-label="QR Code scanner cam"
                        className="aspect-[9/14] w-full rounded-3xl object-fill md:aspect-square"
                    />
                    <div className="absolute left-8 top-8 z-[2] h-[10%] w-1/6 border-l-4 border-t-4 border-primary opacity-80" />
                    <div className="absolute right-8 top-8 z-[2] h-[10%] w-1/6 border-r-4 border-t-4 border-primary opacity-80" />
                    <div className="absolute bottom-8 left-8 z-[2] h-[10%] w-1/6 border-b-4 border-l-4 border-primary opacity-80" />
                    <div className="absolute bottom-8 right-8 z-[2] h-[10%] w-1/6 border-b-4 border-r-4 border-primary opacity-80" />
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
        </>
    )
}

export default VerifyToken
