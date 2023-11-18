import { useState, type FC } from "react"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { api } from "~/utils/api"
import PostAddUpdate from "~/components/PostAddUpdate/PostAddUpdate"
import Modal from "~/components/Modal/Modal"
import Post from "~/components/Post/Post"

interface AidManProps {}
const AidMan: FC<AidManProps> = () => {
    const { data, isLoading, refetch } = api.post.getAMPosts.useQuery()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null)
    const refetchPosts = () => {
        refetch()
    }

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
                <p>Loading...</p>
            ) : (
                <div className="p-5">
                    {data?.map((post) => {
                        const { metaData, startDate, endDate, ...rest } = post
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
                    })}
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
                    setSelectedPost={setSelectedPost}
                />
            </Modal>
        </>
    )
}

export default AidMan
