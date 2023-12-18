import type { WAPost } from "~/@types"
import type { FC } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Post from "./Post/Post"
import PostSkeleton from "./PostSkeleton"

interface IInfinitePostsFeed {
    posts?: WAPost[]
    isError: boolean
    isLoading: boolean
    hasMore?: boolean
    fetchMorePosts: () => Promise<unknown>
}
const InfinitePostsFeed: FC<IInfinitePostsFeed> = ({
    posts,
    isLoading,
    isError,
    hasMore,
    fetchMorePosts,
}) => {
    if (isLoading)
        return (
            <div className="flex flex-col gap-7 p-5">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        )

    if (isError) return <p>Error...</p>

    if (!posts)
        return (
            <p className="py-4 text-center text-2xl text-gray-500">
                No more Posts...
            </p>
        )

    if (posts.length === 0)
        return (
            <p className="py-4 text-center text-2xl text-gray-500">
                No more Posts...
            </p>
        )

    return (
        <div className="p-1">
            <InfiniteScroll
                dataLength={posts.length}
                next={() => void fetchMorePosts()}
                hasMore={hasMore ?? false}
                loader={"loading more...."}
            >
                {posts.map((post) => (
                    <Post key={post.uuid} {...post} />
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default InfinitePostsFeed
