import { useSession } from "next-auth/react"
import { api } from "~/utils/api"
import InfinitePostsFeed from "~/components/InfinitePostsFeed"
import PostSkeleton from "~/components/PostSkeleton"
import Head from "next/head"

const Home = () => {
    const { status } = useSession()

    const posts = api.post.getInfinitePost.useInfiniteQuery(
        {},
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

    if (status === "loading") {
        return (
            <main className="flex flex-col gap-7 p-5">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </main>
        )
    }

    return (
        <>
            <Head>
                <title>Waste-Aid</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <InfinitePostsFeed
                    posts={posts.data?.pages.flatMap((page) => page.posts)}
                    isError={posts.isError}
                    isLoading={posts.isLoading}
                    hasMore={posts.hasNextPage}
                    fetchMorePosts={posts.fetchNextPage}
                />
            </main>
        </>
    )
}

export default Home
