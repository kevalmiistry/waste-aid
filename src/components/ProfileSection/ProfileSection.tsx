import type { FC } from "react"
import { signIn, useSession } from "next-auth/react"
import { useDonationStore } from "~/stores/donation"
import ProfileDonations from "./ProfileDonations"
import ProfileInfo from "./ProfileInfo"
import GoogleIcon from "../GoogleIcon"
import "react-loading-skeleton/dist/skeleton.css"

interface IProfileSection {}
const ProfileSection: FC<IProfileSection> = () => {
    const change = useDonationStore((state) => state.renderer)
    const { status } = useSession()

    if (status === "unauthenticated") {
        return (
            <div className="mt-20 flex w-full flex-col items-center justify-center gap-3">
                <h5 className="text-center">
                    Signin to view, generate & track your donations!
                </h5>
                <button
                    onClick={() => void signIn("google")}
                    className="btn-secondary flex gap-1"
                >
                    <GoogleIcon />
                    SignIn With Google
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-[50vh] w-full flex-col items-center gap-3 p-4 pt-4 md:pt-10">
            <ProfileInfo />

            <ProfileDonations key={change} />
        </div>
    )
}

export default ProfileSection
