import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next"
import type { FormEventHandler } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { createServerSideHelpers } from "@trpc/react-query/server"
import { getServerAuthSession } from "~/server/auth"
import { useDonationStore } from "~/stores/donation"
import { Expand, Users2 } from "lucide-react"
import { cubicBezier } from "~/utils/constants"
import { TRPCError } from "@trpc/server"
import { appRouter } from "~/server/api/root"
import { toDataURL } from "qrcode"
import { useState } from "react"
import { Carousel } from "react-responsive-carousel"
import { saveAs } from "file-saver"
import { prisma } from "~/server/db"
import { api } from "~/utils/api"
import SuperJSON from "superjson"
import moment from "moment"
import Modal from "~/components/Modal"
import Head from "next/head"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export const getServerSideProps = async (
    context: GetServerSidePropsContext<{ slug: string }>
) => {
    const session = await getServerAuthSession(context)

    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {
            session,
            prisma: prisma,
        },
        transformer: SuperJSON,
    })

    try {
        const id = context.params?.slug ?? ""
        const data = await helpers.post.getOnePost.fetch({ pid: id })

        if (data === null) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: false,
                },
            }
        }

        const finalDataProps = {
            ...data,
            startDate: moment(data.startDate).format("DD MMM YY"),
            endDate: moment(data.endDate).format("DD MMM YY"),
            createdAt: moment(data.createdAt).format("DD MMM YY"),
            updatedAt: moment(data.updatedAt).format("DD MMM YY"),
        }

        return {
            props: {
                trpcState: helpers.dehydrate(),
                data: finalDataProps,
            },
        }
    } catch (error) {
        if (error instanceof TRPCError) {
            if (error?.code === "UNAUTHORIZED") {
                return {
                    redirect: {
                        destination: "/auth",
                        permanent: false,
                    },
                }
            }
        }
    }
}

const ViewPost = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { data } = props

    const handleDonationRender = useDonationStore(
        (state) => state.handleDonationRender
    )

    const { mutate: createDonationMutate, isLoading: creatingDonationLoading } =
        api.donation.createDonation.useMutation()

    const [selectedItem, setSelectedItem] = useState(0)
    const [fullViewOpen, setFullViewOpen] = useState(false)

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [inputAmount, setInputAmount] = useState<number | undefined>(
        undefined
    )
    const [errorMessage, setErrorMessage] = useState("")
    const [QRCodeDataURL, setQRCodeDataURL] = useState<string | null>(null)

    if (!data) {
        return (
            <p className="my-10 text-center text-lg font-semibold">
                {"Oops! No Post data found. : ("}
            </p>
        )
    }

    const {
        PostImages,
        title,
        description,
        hasTarget,
        targetAmount,
        collectedAmount,
        amountType,
        _count,
        endDate,
        hasDeadline,
        createdAt,
        startDate,
        address,
        uuid,
        aidman,
    } = data

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

    // prepare OG Image URL
    const encodeObjectToUrl = (obj: Record<string, string>) => {
        return Object.entries(obj)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&")
    }

    const objForOGImage = {
        title: title,
        description: props.data?.description ?? "",
        am_name: aidman.name ?? "",
        postimg: PostImages[0]?.imageURL ?? "",
        ampfp: aidman.image ?? "",
        createdAt: createdAt,
    }

    const ogImgURL =
        process.env.NEXTAUTH_URL + "/api/og?" + encodeObjectToUrl(objForOGImage)

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description ?? ""} />
                <meta property="og:image" content={ogImgURL} />
                <meta property="twitter:image" content={ogImgURL} />
            </Head>
            <div className="pb-36 pt-5">
                <h2 className="mb-2 px-5 text-2xl font-medium text-[#333] md:px-0">
                    Post Details:
                </h2>

                {/* Aid-man Details */}
                <div className="mb-2 flex items-center gap-2">
                    {aidman.image && (
                        <img
                            src={`//wsrv.nl/?url=${aidman.image}`}
                            alt={
                                aidman.name
                                    ? `${aidman.name} profile pic`
                                    : "profile pic"
                            }
                            className="h-[40px] w-[40px] rounded-full border-2"
                        />
                    )}
                    {aidman.name && (
                        <span className="font-medium text-[#333]">
                            {aidman.name}
                        </span>
                    )}
                </div>

                {/* view full image in overlay */}
                <AnimatePresence>
                    {fullViewOpen ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: cubicBezier, duration: 0.3 }}
                            className="absolute inset-0 z-10 flex items-center justify-center bg-[#000000BB]"
                            onClick={() => setFullViewOpen(false)}
                        >
                            <img
                                src={PostImages[selectedItem]?.imageURL}
                                alt={`image ${selectedItem + 1}`}
                                className="z-11 max-h-[80%] max-w-[80%] object-contain"
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* image carousel */}
                <Carousel
                    className="aspect-[16/9] overflow-hidden md:rounded-2xl"
                    swipeable
                    emulateTouch
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    showArrows={false}
                    showIndicators={false}
                    selectedItem={selectedItem}
                    onClickItem={() => setFullViewOpen(true)}
                    onChange={(index) => setSelectedItem(index)}
                >
                    {PostImages.map(({ imageURL, uuid }, idx) => (
                        <div className="relative" key={uuid}>
                            <img
                                src={imageURL}
                                alt={`image ${idx + 1}`}
                                className="object-cover"
                            />
                            <Expand
                                className="absolute right-5 top-5 rounded-md bg-gray-600 bg-transparent p-1 shadow-xl"
                                color="#fff"
                                size={"1.5rem"}
                            />
                        </div>
                    ))}
                </Carousel>

                {/* image carousel bullets */}
                <div className="mt-3 flex items-center justify-center gap-2 ">
                    {PostImages.map(({ uuid }, idx) => (
                        <span
                            key={uuid}
                            className={`inline-block h-[8px] w-[8px] rounded-full ${
                                selectedItem === idx ? "bg-black" : "bg-primary"
                            }`}
                            onClick={() => setSelectedItem(idx)}
                            role="button"
                            tabIndex={0}
                            aria-label={`image ${idx + 1}`}
                        ></span>
                    ))}
                </div>

                <div className="px-5 md:px-0">
                    <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
                    <p className="whitespace-pre-line text-[#555]">
                        {description}
                    </p>

                    <div className="mt-4 flex gap-4 text-lg">
                        <div className="flex-1">
                            <p className="font-light text-[#888]">Collected</p>
                            <p className="font-satoshi text-2xl font-medium">
                                {collectedAmount ?? 0}
                                {hasTarget && (
                                    <span className="text-base font-normal text-[#666]">
                                        {" "}
                                        /{" "}
                                        {targetAmount +
                                            " " +
                                            amountType?.toUpperCase()}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="font-light text-[#888]">By</p>
                            <p className="font-satoshi flex items-center gap-1 text-2xl font-medium">
                                {_count.donations} <Users2 />{" "}
                                {data.donations.map((donation, idx) => (
                                    <img
                                        key={idx}
                                        src={donation?.donator?.image ?? ""}
                                        alt={`donator ${idx}`}
                                        className="h-5 w-5 rounded-full"
                                    />
                                ))}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        {hasDeadline && (
                            <div className="flex-1">
                                <p className="mt-4 font-light text-[#888]">
                                    Start Date:{" "}
                                    <span className="font-satoshi font-medium uppercase text-[#333]">
                                        {startDate}
                                    </span>
                                </p>
                            </div>
                        )}
                        {hasDeadline && (
                            <div className="flex-1">
                                <p className="mt-4 font-light text-[#888]">
                                    Last Date:{" "}
                                    <span className="font-satoshi font-medium uppercase text-[#333]">
                                        {endDate}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="mb-1 mt-5 text-lg font-medium">Address:</p>
                    <div className="rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-3 py-1 text-[#333]">
                        <p className="whitespace-pre-line">{address}</p>
                    </div>

                    <div className="mb-3 mt-5 flex items-center justify-between">
                        <small className="font-satoshi uppercase">
                            {createdAt}
                        </small>
                    </div>

                    <div
                        className="flex justify-end"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <button className="btn btn-primary">
                            Generate Token
                        </button>
                    </div>
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
                                    <span className="uppercase">
                                        {amountType}
                                    </span>{" "}
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
                                onChange={(e) =>
                                    setInputAmount(+e.target.value)
                                }
                            />
                            <small className="text-red-500">
                                {errorMessage}
                            </small>
                            <div className="flex justify-center">
                                <button
                                    className="btn-primary mt-5 w-min text-sm"
                                    disabled={creatingDonationLoading}
                                >
                                    Generate!
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
                                Now make sure you save Screenshot or Download
                                this QR code and attach a print of it with the
                                parcel you are sending in your collected waste.
                            </p>
                            <p className="mt-2 text-center text-sm">
                                The Receiver will scan this QR code from their
                                side and you will be notified.
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
            </div>
        </>
    )
}

export default ViewPost
