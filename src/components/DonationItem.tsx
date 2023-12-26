import type { WADonation } from "~/@types"
import type { FC } from "react"
import moment from "moment"
import Link from "next/link"

interface IDonationItem {
    donation: WADonation
}
const DonationItem: FC<IDonationItem> = ({ donation }) => {
    return (
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
                        on: {moment(donation.reachedDate).format("DD/MM/YYY")}
                    </span>
                )}
            </div>
        </div>
    )
}

export default DonationItem
