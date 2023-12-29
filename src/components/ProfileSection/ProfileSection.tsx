import type { FC } from "react"
import { useDonationStore } from "~/stores/donation"
import ProfileDonations from "./ProfileDonations"
import ProfileInfo from "./ProfileInfo"
import "react-loading-skeleton/dist/skeleton.css"

interface IProfileSection {}
const ProfileSection: FC<IProfileSection> = () => {
    const change = useDonationStore((state) => state.renderer)

    return (
        <div className="flex h-[50vh] w-full flex-col items-center gap-3 p-4 pt-4 md:pt-10">
            <ProfileInfo />

            <ProfileDonations key={change} />
        </div>
    )
}

export default ProfileSection
