import { useState, type FC, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { api } from "~/utils/api"
import PostAddUpdate from "~/components/PostAddUpdate/PostAddUpdate"
import PostSkeleton from "~/components/PostSkeleton"
import Modal from "~/components/Modal/Modal"
import Post from "~/components/Post/Post"
import Image from "next/image"

interface AidManProps {}
const AidMan: FC<AidManProps> = () => {
    const { data, isLoading, refetch } = api.post.getAMPosts.useQuery()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null)
    const refetchPosts = () => {
        refetch()
    }

    useEffect(() => {
        if (!modalOpen) {
            setSelectedPost(null)
        }
    }, [modalOpen])

    return (
        <>
            <div className="flex justify-center pt-5">
                <motion.button
                    initial={{ translateY: "-100%" }}
                    animate={{ translateY: "0%" }}
                    className="btn-primary flex items-center gap-1 rounded-full px-10"
                    onClick={() => setModalOpen(true)}
                >
                    Add Post <Sparkles size={"20px"} />
                </motion.button>
            </div>
            {isLoading ? (
                <div className="p-8">
                    <PostSkeleton />
                </div>
            ) : (
                <div className="p-5">
                    {data && data?.length > 0 ? (
                        data?.map((post) => {
                            const { metaData, startDate, endDate, ...rest } =
                                post
                            return (
                                <Post
                                    key={post.uuid}
                                    {...rest}
                                    startDate={startDate?.toISOString()}
                                    endDate={endDate?.toISOString()}
                                    refetchPosts={refetchPosts}
                                    setModalOpen={setModalOpen}
                                    setSelectedPost={setSelectedPost}
                                />
                            )
                        })
                    ) : (
                        <div className="justify-starts flex flex-col items-center gap-28">
                            <p className="mt-5 text-center">
                                Oops! there is no post yet.{" "}
                                <button
                                    className="font-medium text-blue-600 underline"
                                    onClick={() => setModalOpen(true)}
                                >
                                    Create One?
                                </button>
                            </p>
                            <Image
                                src={"/nothing-to-see.png"}
                                alt="nothing to see"
                                width={300}
                                height={300}
                            />
                        </div>
                    )}
                </div>
            )}

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                classNames="pr-2"
            >
                <PostAddUpdate
                    setModalOpen={setModalOpen}
                    refetchPosts={refetchPosts}
                    selectedPost={selectedPost}
                />
            </Modal>
        </>
    )
}

export default AidMan
