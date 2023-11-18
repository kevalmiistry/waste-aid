import { useState, type FC, Dispatch, SetStateAction } from "react"
import { Expand, Pencil, Trash, Users2, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useNotifierStore } from "~/stores/notifier"
import { type PostTypes } from "~/components/PostAddUpdate/PostAddUpdate"
import { cubicBezier } from "~/utils/constants"
import { Carousel } from "react-responsive-carousel"
import { api } from "~/utils/api"
import moment from "moment"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

interface IPost {
    PostImages: {
        imageURL: string
        uuid: string
    }[]
    _count: {
        donations: number
    }
    createdAt: Date
    uuid: string
    refetchPosts: () => void
    setModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedPost: Dispatch<SetStateAction<string | null>>
}
const Post: FC<IPost & PostTypes> = ({
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
    uuid,
    refetchPosts,
    setModalOpen,
    setSelectedPost,
}) => {
    const { notify } = useNotifierStore()
    const { mutate: deletePostMutate, isLoading } =
        api.post.deletePost.useMutation()

    const [selectedItem, setSelectedItem] = useState(0)
    const [fullViewOpen, setFullViewOpen] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)

    const handleDelete = () => {
        if (deleteClicked) {
            deletePostMutate(
                { uuid: uuid },
                {
                    onSuccess() {
                        refetchPosts()
                        notify({
                            show: true,
                            message: "Post Deleted! :D",
                            status: "success",
                            duration: 5000,
                        })
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
        <div className="border-b border-t border-[2] p-4 text-[#333]">
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
                            className="max-h-[80%] max-w-[80%] object-contain"
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Edit and Delete buttons */}
            <div className="flex items-center justify-end gap-2 pb-3">
                <button
                    disabled={isLoading}
                    className={`flex h-[2rem] items-center justify-center rounded-full p-2 ${
                        deleteClicked ? "bg-gray-500" : "bg-[#33b5e5]"
                    }`}
                    onClick={handleEdit}
                >
                    {deleteClicked ? (
                        <X size={"1rem"} strokeWidth="2px" color="#fff" />
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
                            <small className="font-medium">Deleting...</small>
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
                                Confirm!
                            </motion.small>
                        )
                    ) : (
                        <Trash size={"1rem"} strokeWidth="2px" />
                    )}
                </button>
            </div>

            {/* image carousel */}
            <Carousel
                className="aspect-[16/9] overflow-hidden rounded-2xl"
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
                            className="absolute right-5 top-5 shadow-lg shadow-black"
                            color="#fff"
                            size={"1.25rem"}
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

            <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
            <p className="text-[#555]">{description}</p>

            <div className="mt-4 flex gap-4 text-lg">
                <div className="flex-1">
                    <p className="font-light text-[#888]">Collected</p>
                    <p className="font-satoshi text-2xl font-medium">
                        {collectedAmount || 0}
                        {hasTarget && (
                            <span className="text-base font-normal text-[#666]">
                                {" "}
                                /{" "}
                                {targetAmount + " " + amountType?.toUpperCase()}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex-1">
                    <p className="font-light text-[#888]">By</p>
                    <p className="font-satoshi flex items-center gap-1 text-2xl font-medium">
                        {_count.donations} <Users2 />
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
                className="mb-3 mt-5 flex items-center justify-between"
            >
                <small className="font-satoshi uppercase">
                    {moment(createdAt).format("DD MMM YY")}
                </small>
                <button
                    disabled={isLoading}
                    className="btn-primary rounded-full p-1 px-3 text-sm"
                >
                    Know more!
                </button>
            </div>
        </div>
    )
}

export default Post
