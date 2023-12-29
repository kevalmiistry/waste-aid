import type { FC } from "react"
import { useSession } from "next-auth/react"
import Skeleton from "react-loading-skeleton"

interface IProfileInfo {}
const ProfileInfo: FC<IProfileInfo> = () => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <>
                <Skeleton circle height={"100px"} width={"100px"} />
                <Skeleton width={"200px"} className="py-1" />
            </>
        )
    }

    return (
        <>
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
        </>
    )
}

export default ProfileInfo
