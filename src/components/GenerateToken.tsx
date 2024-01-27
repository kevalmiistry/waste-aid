import type { FC, FormEventHandler } from "react"
import { signIn, useSession } from "next-auth/react"
import { useDonationStore } from "~/stores/donation"
import { cubicBezier } from "~/utils/constants"
import { toDataURL } from "qrcode"
import { useState } from "react"
import { motion } from "framer-motion"
import { saveAs } from "file-saver"
import { api } from "~/utils/api"
import GoogleIcon from "./GoogleIcon"
import Modal from "./Modal"

interface IGenerateToken {
    uuid: string
    amountType: string
}
const GenerateToken: FC<IGenerateToken> = ({ amountType, uuid }) => {
    const { status } = useSession()
    const { mutate: createDonationMutate, isLoading: creatingDonationLoading } =
        api.donation.createDonation.useMutation()

    const handleDonationRender = useDonationStore(
        (state) => state.handleDonationRender
    )

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")
    const [QRCodeDataURL, setQRCodeDataURL] = useState<string | null>(null)

    const [inputAmount, setInputAmount] = useState<number | undefined>(
        undefined
    )

    const saveBase64AsFile = (base64: string, fileName: string): void => {
        const splitData = base64.split(";base64,")
        if (splitData.length !== 2) {
            throw new Error("Invalid base64 string")
        }

        const data = splitData.pop()!
        const contentType = base64.match(/:([^;]+);/)?.[1]

        if (!contentType) {
            throw new Error("Invalid content type in base64 string")
        }

        const byteCharacters = atob(data)
        const byteNumbers = new Array(byteCharacters.length)

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: contentType })

        saveAs(blob, fileName)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if (!inputAmount || inputAmount <= 0) {
            setErrorMessage("Please enter a valid value")
            return
        }

        createDonationMutate(
            {
                post_id: uuid,
                donatedAmout: inputAmount,
            },
            {
                async onSuccess(data) {
                    const URL = await toDataURL(data.uuid, {
                        scale: 20,
                    })
                    setQRCodeDataURL(URL)
                    saveBase64AsFile(
                        URL,
                        `${inputAmount} ${amountType} donation QR Code`
                    )
                    handleDonationRender()
                },
            }
        )
    }

    if (status === "loading") {
        return null
    }

    if (status === "unauthenticated") {
        return (
            <div
                className="mb-2 flex flex-col items-end justify-end gap-2"
                onClick={() => setIsDialogOpen(true)}
            >
                <h5 className="text-center">Signin to generate token!</h5>
                <button
                    onClick={() => void signIn("google")}
                    className="btn-secondary flex w-fit gap-1"
                >
                    <GoogleIcon />
                    SignIn
                </button>
            </div>
        )
    }

    return (
        <>
            <div
                className="flex justify-end"
                onClick={() => setIsDialogOpen(true)}
            >
                <button className="btn btn-primary">Generate Token</button>
            </div>

            <Modal
                open={isDialogOpen}
                classNames="w-[90%] max-w-[500px] min-h-[40%] h-fit"
                onClose={() => setIsDialogOpen(false)}
            >
                <div className="relative text-xl font-medium italic">
                    {"Let's get to generate your Token :D"}
                    <div className="absolute -bottom-1 h-[1px] w-full bg-gray-200" />
                </div>
                {!QRCodeDataURL && (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-5 flex flex-col"
                    >
                        <label htmlFor="amount">
                            Please enter the amount you sending in!{" "}
                            <span className="font-satoshi font-thin">
                                ( in{" "}
                                <span className="uppercase">{amountType}</span>{" "}
                                )
                            </span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            placeholder="Eg. 10000"
                            className="w-full rounded-lg border-2 px-2 py-1 placeholder:text-sm placeholder:font-light placeholder:italic"
                            value={inputAmount}
                            onChange={(e) => setInputAmount(+e.target.value)}
                        />
                        <small className="text-red-500">{errorMessage}</small>
                        <div className="flex justify-center">
                            <button
                                className="btn-primary mt-5 w-min text-sm"
                                disabled={creatingDonationLoading}
                            >
                                {creatingDonationLoading ? (
                                    <>
                                        <span className="loader loader-dark loader-sm mr-2" />
                                        Generating...
                                    </>
                                ) : (
                                    "Generate!"
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {QRCodeDataURL && (
                    <div className="mt-4 flex flex-col items-center justify-center gap-1 text-[#333]">
                        <div className="font-light">
                            Amount:{" "}
                            <span className="font-satoshi text-lg font-semibold capitalize">
                                {inputAmount} {amountType}
                            </span>
                        </div>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ ease: cubicBezier }}
                            src={QRCodeDataURL}
                            alt="QR Code"
                            className="w-[80%] md:w-[50%]"
                        />

                        <p className="text font-medium">
                            Woohoo!!! QR code generated🥳
                        </p>
                        <p className="text-center text-sm">
                            Now make sure you save Screenshot or Download this
                            QR code and attach a print of it with the parcel you
                            are sending in your collected waste.
                        </p>
                        <p className="mt-2 text-center text-sm">
                            The Receiver will scan this QR code from their side
                            and you will be notified.
                        </p>
                        <button
                            className="my-2 text-sm text-blue-700 underline"
                            onClick={() =>
                                saveBase64AsFile(
                                    QRCodeDataURL,
                                    `${inputAmount} ${amountType} donation QR Code`
                                )
                            }
                        >
                            Download
                        </button>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default GenerateToken
