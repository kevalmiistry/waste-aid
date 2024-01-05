import type { FC } from "react"
import { api } from "~/utils/api"
import InfiniteDonationsList from "~/components/InfiniteDonationsList"
import Head from "next/head"

interface IMyDonations {}
const MyDonations: FC<IMyDonations> = () => {
    const donations = api.donation.listInfiniteDonations.useInfiniteQuery(
        {},
        {
            getNextPageParam: (page) => page.nextCursor,
        }
    )

    return (
        <>
            <Head>
                <title>Waste-Aid | My Donations</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="px-3">
                <h1 className="pb-3 pt-5 text-xl font-medium">My Donations:</h1>
                <InfiniteDonationsList
                    donations={donations.data?.pages.flatMap(
                        (page) => page.donations
                    )}
                    isError={donations.isError}
                    isLoading={donations.isLoading}
                    hasMore={donations.hasNextPage}
                    fetchMoreDonations={donations.fetchNextPage}
                />
            </div>
        </>
    )
}

export default MyDonations
