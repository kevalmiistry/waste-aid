import type { Dispatch, FC, SetStateAction } from "react"
import type { WAPost } from "~/@types"
import { CheckCircle } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"
import PostSkeleton from "./PostSkeleton"
import Image from "next/image"
import Post from "./Post"

interface IInfinitePostsFeed {
    posts?: WAPost[]
    isError: boolean
    isLoading: boolean
    hasMore?: boolean
    fetchMorePosts: () => Promise<unknown>
    setModalOpen?: Dispatch<SetStateAction<boolean>>
    setSelectedPost?: Dispatch<SetStateAction<string | null>>
    refetchPosts?: () => Promise<void>
    isAidmanFeed?: boolean
}

const InfinitePostsFeed: FC<IInfinitePostsFeed> = ({
    posts,
    isLoading,
    isError,
    hasMore,
    fetchMorePosts,
    setModalOpen = () => null,
    setSelectedPost = () => null,
    refetchPosts = () => new Promise((resolve) => resolve()),
    isAidmanFeed = false,
}) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-7 py-5">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        )
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="justify-starts flex flex-col items-center gap-28">
                <p className="mt-5 text-center">
                    Oops! there is no post yet.{" "}
                    {isAidmanFeed && (
                        <button
                            className="font-medium text-blue-600 underline"
                            onClick={() => setModalOpen(true)}
                        >
                            Create One?
                        </button>
                    )}
                </p>
                <Image
                    src={"/nothing-to-see.png"}
                    alt="nothing to see"
                    width={300}
                    height={300}
                />
            </div>
        )
    }

    if (isError) return <p>Error...</p>

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={() => void fetchMorePosts()}
            hasMore={hasMore ?? false}
            loader={<LoadingMore />}
            endMessage={<EndMessage />}
        >
            {posts.map((post) => (
                <Post
                    isAidmanFeed={isAidmanFeed}
                    key={post.uuid}
                    setSelectedPost={setSelectedPost}
                    setModalOpen={setModalOpen}
                    refetchPosts={refetchPosts}
                    {...post}
                />
            ))}
        </InfiniteScroll>
    )
}

const LoadingMore = () => (
    <div className="flex w-full items-center justify-center py-10">
        <span className="loader loader-primary" />
    </div>
)

const EndMessage = () => (
    <div className="flex w-full items-center justify-center gap-3 py-10 text-xl font-medium text-primary">
        <CheckCircle color="rgb(150, 217, 5)" /> {"You've all caught up! 😃"}
    </div>
)

export default InfinitePostsFeed
