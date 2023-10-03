import type { FC } from "react"
import { useSession } from "next-auth/react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface IProfileSection {}
const ProfileSection: FC<IProfileSection> = () => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full flex-col items-center gap-3 p-4 pt-10">
                <Skeleton circle height={"100px"} width={"100px"} />
                <Skeleton width={"200px"} className="py-1" />
                <div className="mt-3" />
                <Skeleton width={"300px"} count={4} />
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
        </div>
    )
}

export default ProfileSection
