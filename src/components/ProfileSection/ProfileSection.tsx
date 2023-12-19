import type { Dispatch, FC, SetStateAction } from "react"
import { useSession } from "next-auth/react"
import { api } from "~/utils/api"
import { X } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import moment from "moment"
import Link from "next/link"
import "react-loading-skeleton/dist/skeleton.css"

interface IProfileSection {
    setOpenProfile: Dispatch<SetStateAction<boolean>>
}
const ProfileSection: FC<IProfileSection> = ({ setOpenProfile }) => {
    const { data: session, status } = useSession()
    const { data, isLoading } = api.donation.listDonations.useQuery()

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full flex-col items-center gap-3 p-4 pt-10">
                <Skeleton circle height={"100px"} width={"100px"} />
                <Skeleton width={"200px"} className="py-1" />
                <div className="mt-5" />
                <div className="mt-5 w-full px-2 md:px-6">
                    <Skeleton
                        className="mb-1 h-20 w-full px-3 py-2 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                        count={4}
                    />
                </div>
                <button
                    className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 md:hidden"
                    onClick={() => setOpenProfile(false)}
                >
                    <X size={"1.75rem"} color="#333" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full flex-col items-center gap-3 p-4 pt-10">
            <img
                src={
                    session?.user?.image
                        ? `//wsrv.nl/?url=${session?.user?.image}`
                        : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                }
                className="h-[100px] w-[100px] rounded-full border-2"
                alt="profile-img"
            />
            <p className="text-xl font-medium text-gray-600">
                {session?.user?.name}
            </p>

            <div className="mt-5 w-full px-2 md:px-6">
                {isLoading && (
                    <Skeleton
                        className="mb-1 h-20 w-full px-3 py-2 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl"
                        count={4}
                    />
                )}
            </div>

            {data && data.length > 0 ? (
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
                                        <small className="text-gray-600">
                                            Amount
                                        </small>
                                        <p className="font-satoshi">
                                            {donation.donatedAmout}{" "}
                                            <span className="font-light uppercase">
                                                {donation.post.amountType}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <small className="text-gray-600">
                                            Status:
                                        </small>
                                        {donation.reached ? (
                                            <p className="text-green-600">
                                                Reached!
                                            </p>
                                        ) : (
                                            <p className="text-yellow-500">
                                                Pending
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-1 flex justify-between text-gray-600">
                                    <span className="text-xs">
                                        {moment(donation.createdAt).format(
                                            "DD/MM/YYY"
                                        )}
                                    </span>
                                    {donation.reached && (
                                        <span className="text-xs">
                                            on:{" "}
                                            {moment(
                                                donation.reachedDate
                                            ).format("DD/MM/YYY")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="italic">No donations to show...</p>
            )}

            <button
                className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 md:hidden"
                onClick={() => setOpenProfile(false)}
            >
                <X size={"1.75rem"} color="#333" />
            </button>
        </div>
    )
}

export default ProfileSection
