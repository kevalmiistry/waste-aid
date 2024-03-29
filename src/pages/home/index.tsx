import { useSession } from "next-auth/react"
import { api } from "~/utils/api"
import InfinitePostsFeed from "~/components/InfinitePostsFeed"
import PostSkeleton from "~/components/PostSkeleton"
import Head from "next/head"
import { WAFullLogo } from "~/components/WALogos"

const Home = () => {
    const { status } = useSession()

    const posts = api.post.getInfinitePost.useInfiniteQuery(
        {},
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    )

    if (status === "loading") {
        return (
            <main className="flex flex-col gap-7 py-5">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </main>
        )
    }

    return (
        <>
            <Head>
                <title>Waste-Aid | Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <WAFullLogo className="my-4 block h-[36px] w-fit pl-4 md:hidden" />
                <h1 className="my-2 hidden text-2xl font-medium md:block">
                    Feed:
                </h1>
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
