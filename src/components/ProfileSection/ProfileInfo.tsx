import type { Dispatch, FC, SetStateAction } from "react"
import { useSession } from "next-auth/react"
import { X } from "lucide-react"
import Skeleton from "react-loading-skeleton"

interface IProfileInfo {
    setOpenProfile: Dispatch<SetStateAction<boolean>>
}
const ProfileInfo: FC<IProfileInfo> = ({ setOpenProfile }) => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <>
                <Skeleton circle height={"100px"} width={"100px"} />
                <Skeleton width={"200px"} className="py-1" />

                <button
                    className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 md:hidden"
                    onClick={() => setOpenProfile(false)}
                >
                    <X size={"1.75rem"} color="#333" />
                </button>
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
