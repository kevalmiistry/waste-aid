import type { Dispatch, FC, SetStateAction } from "react"
import { useDonationStore } from "~/stores/donation"
import { X } from "lucide-react"
import ProfileDonations from "./ProfileDonations"
import ProfileInfo from "./ProfileInfo"
import "react-loading-skeleton/dist/skeleton.css"

interface IProfileSection {
    setOpenProfile: Dispatch<SetStateAction<boolean>>
}
const ProfileSection: FC<IProfileSection> = ({ setOpenProfile }) => {
    const change = useDonationStore((state) => state.renderer)

    return (
        <div className="flex h-screen w-full flex-col items-center gap-3 p-4 pt-10">
            <ProfileInfo setOpenProfile={setOpenProfile} />

            <ProfileDonations key={change} />

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
