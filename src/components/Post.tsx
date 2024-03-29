import type { FC, Dispatch, SetStateAction } from "react"
import type { WAPost } from "~/@types"
import { Expand, Pencil, Trash, Users2, X } from "lucide-react"
import { cubicBezier } from "~/utils/constants"
import { Carousel } from "react-responsive-carousel"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { api } from "~/utils/api"
import moment from "moment"
import Modal from "./Modal"
import Link from "next/link"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

interface IPostCardProps extends WAPost {
    isAidmanFeed?: boolean
    refetchPosts?: () => Promise<void>
    setModalOpen?: Dispatch<SetStateAction<boolean>>
    setSelectedPost?: Dispatch<SetStateAction<string | null>>
}
const Post: FC<IPostCardProps> = ({
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
    donations,
    uuid,
    aidman,
    isAidmanFeed = false,
    refetchPosts = () => null,
    setModalOpen = () => null,
    setSelectedPost = () => null,
}) => {
    const { mutate: deletePostMutate, isLoading } =
        api.post.deletePost.useMutation()

    const [selectedItem, setSelectedItem] = useState(0)
    const [fullViewOpen, setFullViewOpen] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [postDeleted, setPostDeleted] = useState(false)

    const handleDelete = () => {
        if (deleteClicked) {
            deletePostMutate(
                { uuid: uuid },
                {
                    async onSuccess() {
                        setPostDeleted(true)
                        toast.success("Post Deleted! :D")
                        await refetchPosts()
                    },
                }
            )
        } else {
            setDeleteClicked(true)
        }
    }

    const handleEdit = () => {
        if (deleteClicked) {
            setDeleteClicked(false)
        } else {
            setSelectedPost(uuid)
            setModalOpen(true)
        }
    }

    return (
        <div className="border-b border-t border-[2] py-4 text-[#333]">
            {/* view full image in overlay */}
            <Modal
                open={fullViewOpen}
                onClose={() => setFullViewOpen(false)}
                classNames="pr-2 bg-transparent flex items-center justify-center p-0 shadow-none h-fit"
                overlayClassName="bg-[#000000BB]"
                placeDirectChildren
            >
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: cubicBezier, duration: 0.3 }}
                    src={PostImages[selectedItem]?.imageURL}
                    alt={`image ${selectedItem + 1}`}
                    className="fixed left-1/2 top-1/2 z-[5] h-auto w-[94vw] -translate-x-1/2 -translate-y-1/2 object-contain md:w-[70vw]"
                />
            </Modal>

            {/* Edit and Delete buttons */}
            {isAidmanFeed ? (
                <div className="flex items-center justify-between">
                    <div className="mb-1 ml-3 flex items-center gap-2 md:ml-0">
                        {/* Aid-man Details */}
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
                    <div className="flex items-center justify-end gap-2 px-3 pb-3 md:px-0">
                        <button
                            disabled={isLoading}
                            className={`flex h-[2rem] items-center justify-center rounded-full p-2 ${
                                deleteClicked ? "bg-gray-500" : "bg-[#33b5e5]"
                            }`}
                            onClick={handleEdit}
                        >
                            {deleteClicked ? (
                                <X
                                    size={"1rem"}
                                    strokeWidth="2px"
                                    color="#fff"
                                />
                            ) : (
                                <Pencil size={"1rem"} strokeWidth="2px" />
                            )}
                        </button>

                        <button
                            disabled={isLoading}
                            className={`flex h-[2rem] items-center justify-center rounded-full bg-[#ff4444] p-2 transition-all ${
                                deleteClicked ? "w-[5rem]" : "w-[2rem]"
                            }`}
                            onClick={handleDelete}
                        >
                            {deleteClicked ? (
                                isLoading ? (
                                    <small className="font-medium">
                                        Deleting...
                                    </small>
                                ) : (
                                    <motion.small
                                        initial={{ scaleX: 0 }}
                                        animate={{
                                            scaleX: 1,
                                            transformOrigin: "right",
                                        }}
                                        transition={{
                                            bounce: 0,
                                            ease: "linear",
                                            duration: 0.125,
                                        }}
                                        className="font-medium"
                                    >
                                        {postDeleted ? "Deleted!" : "Confirm!"}
                                    </motion.small>
                                )
                            ) : (
                                <Trash size={"1rem"} strokeWidth="2px" />
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-1 ml-3 flex items-center gap-2 md:ml-0">
                    {/* Aid-man Details */}
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
            )}

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
                <p className="line-clamp-2 text-[#555]">{description}</p>

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
                            {_count.donations} <Users2 />
                            {donations.map((donation, idx) => (
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
                {hasDeadline && (
                    <p className="mt-4 font-light text-[#888]">
                        Last Date:{" "}
                        <span className="font-satoshi font-medium uppercase text-[#333]">
                            {moment(endDate).format("DD MMM YY")}
                        </span>
                    </p>
                )}

                <div
                    aria-label="footer"
                    className="mb-3 mt-5 flex items-center justify-between pr-3"
                >
                    <small className="font-satoshi uppercase">
                        {moment(createdAt).format("DD MMM YY")}
                    </small>
                    <Link
                        href={`/post/${uuid}`}
                        className="btn-primary rounded-full p-1 px-3 text-sm"
                    >
                        Know more!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Post
