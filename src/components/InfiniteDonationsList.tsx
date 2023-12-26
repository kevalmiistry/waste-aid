import type { WADonation } from "~/@types"
import type { FC } from "react"
import { CheckCircle } from "lucide-react"
import InfiniteScroll from "react-infinite-scroll-component"
import DonationItem from "~/components/DonationItem"
import Skeleton from "react-loading-skeleton"
import Image from "next/image"

interface InfiniteDonationsList {
    donations?: WADonation[]
    isError: boolean
    isLoading: boolean
    hasMore?: boolean
    fetchMoreDonations: () => Promise<unknown>
}
const InfiniteDonationsList: FC<InfiniteDonationsList> = ({
    donations,
    isError,
    isLoading,
    hasMore,
    fetchMoreDonations,
}) => {
    if (isLoading) {
        return (
            <div className="mb-1 w-full px-3 py-2">
                <Skeleton
                    className="mb-1 h-20 w-full px-3 py-2 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                    count={4}
                />
            </div>
        )
    }

    if (!donations || donations.length === 0) {
        return (
            <div className="justify-starts flex flex-col items-center gap-28">
                <p className="mt-5 text-center">
                    {"You don't have any donations!"}
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
            dataLength={donations?.length}
            next={() => void fetchMoreDonations()}
            hasMore={hasMore ?? false}
            loader={<LoadingMore />}
            endMessage={<EndMessage />}
        >
            {donations.map((donation) => (
                <DonationItem key={donation.uuid} donation={donation} />
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
        <CheckCircle color="rgb(150, 217, 5)" />{" "}
        {"You don't have anymore donations! 😃"}
    </div>
)

export default InfiniteDonationsList
