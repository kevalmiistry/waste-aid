import { useState, type FC, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { api } from "~/utils/api"
import InfinitePostsFeed from "~/components/InfinitePostsFeed"
import PostAddUpdate from "~/components/PostAddUpdate"
import Modal from "~/components/Modal"

interface AidManProps {}
const AidMan: FC<AidManProps> = () => {
    const posts = api.post.getAMPosts.useInfiniteQuery(
        {},
        {
            getNextPageParam: (page) => page.nextCursor,
        }
    )

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null)

    const refetchPosts = async (): Promise<void> => {
        await posts.refetch()
    }

    useEffect(() => {
        if (!modalOpen) {
            setSelectedPost(null)
        }
    }, [modalOpen])

    return (
        <>
            <div className="flex justify-center pb-4 pt-4">
                <motion.button
                    initial={{ translateY: "-100%" }}
                    animate={{ translateY: "0%" }}
                    className="btn-primary flex items-center gap-1 rounded-full px-10"
                    onClick={() => setModalOpen(true)}
                >
                    Add Post <Sparkles size={"20px"} />
                </motion.button>
            </div>

            <InfinitePostsFeed
                posts={posts.data?.pages.flatMap((page) => page.posts)}
                isError={posts.isError}
                isLoading={posts.isLoading}
                hasMore={posts.hasNextPage}
                fetchMorePosts={posts.fetchNextPage}
                setModalOpen={setModalOpen}
                setSelectedPost={setSelectedPost}
                refetchPosts={refetchPosts}
                isAidmanFeed
            />

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
