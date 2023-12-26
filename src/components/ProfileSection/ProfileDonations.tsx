import type { FC } from "react"
import { api } from "~/utils/api"
import DonationItem from "../DonationItem"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"

interface IProfileDonations {}
const ProfileDonations: FC<IProfileDonations> = () => {
    const { data, isLoading } = api.donation.listInitialDonations.useQuery()

    return isLoading ? (
        <div className="mb-1 w-full px-3 py-2">
            <Skeleton
                className="mb-1 h-20 w-full px-3 py-2 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                count={4}
            />
        </div>
    ) : data?.donations && data.donations.length > 0 ? (
        <>
            <h3 className="mt-2">My Donations:</h3>
            <div className="w-full px-2 md:px-6">
                {data.donations.map((donation) => (
                    <DonationItem key={donation.uuid} donation={donation} />
                ))}
            </div>
            <div className="flex items-center justify-center py-3">
                <Link
                    href={`/mydonations`}
                    className="btn-primary rounded-full text-sm"
                >
                    + {data.remainingDonations}
                </Link>
            </div>
        </>
    ) : (
        <p className="italic">No donations to show...</p>
    )
}

export default ProfileDonations
