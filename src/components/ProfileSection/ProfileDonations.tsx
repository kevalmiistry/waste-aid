import type { FC } from "react"
import { api } from "~/utils/api"
import Skeleton from "react-loading-skeleton"
import moment from "moment"
import Link from "next/link"

interface IProfileDonations {}
const ProfileDonations: FC<IProfileDonations> = () => {
    const { data, isLoading } = api.donation.listDonations.useQuery()

    return isLoading ? (
        <div className="mb-1 w-full px-3 py-2">
            <Skeleton
                className="mb-1 h-20 w-full px-3 py-2 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                count={4}
            />
        </div>
    ) : data && data.length > 0 ? (
        <>
            <h3 className="mt-2">My Donations:</h3>
            <div className="w-full px-2 md:px-6">
                {data.map((donation) => (
                    <div
                        key={donation.uuid}
                        aria-label="donation-token"
                        className="mb-1 w-full bg-primary-200 px-3 py-2 font-medium text-[#333] odd:bg-primary-300 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                    >
                        <Link
                            href={`/post/${donation.post_id}`}
                            className="line-clamp-1 cursor-pointer hover:underline"
                        >
                            {donation.post.title}
                        </Link>
                        <div className="mt-1 flex justify-between">
                            <div>
                                <small className="text-gray-600">Amount</small>
                                <p className="font-satoshi">
                                    {donation.donatedAmout}{" "}
                                    <span className="font-light uppercase">
                                        {donation.post.amountType}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <small className="text-gray-600">Status:</small>
                                {donation.reached ? (
                                    <p className="text-green-600">Reached!</p>
                                ) : (
                                    <p className="text-yellow-500">Pending</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-1 flex justify-between text-gray-600">
                            <span className="text-xs">
                                {moment(donation.createdAt).format("DD/MM/YYY")}
                            </span>
                            {donation.reached && (
                                <span className="text-xs">
                                    on:{" "}
                                    {moment(donation.reachedDate).format(
                                        "DD/MM/YYY"
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : (
        <p className="italic">No donations to show...</p>
    )
}

export default ProfileDonations
