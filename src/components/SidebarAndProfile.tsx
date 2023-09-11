/* eslint-disable @next/next/no-img-element */
import type { FC, ReactNode } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface ISidebarAndProfile {
    children: ReactNode
}

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    const { data: session } = useSession()

    return (
        <>
            <div className="flex h-screen">
                <div aria-label="sidebar" className="flex-[2] p-4">
                    <ul>
                        <Link href={"/"}>
                            <li>Home</li>
                        </Link>
                        <Link href={"/About"}>
                            <li>About</li>
                        </Link>
                        <Link href={"/welcome"}>
                            <li>Welcome</li>
                        </Link>
                    </ul>
                </div>
                <div
                    aria-label="main-section"
                    className="flex-[4] border-l-[2px] border-r-[2px]"
                >
                    {children}
                </div>
                <div
                    aria-label="profile"
                    className="flex flex-[2] justify-center p-4"
                >
                    <img
                        src={
                            session?.user?.image
                                ? `//wsrv.nl/?url=${session?.user?.image}`
                                : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                        }
                        className="h-[100px] w-[100px] rounded-full border-2"
                        alt="profile-img"
                    />
                </div>
            </div>
        </>
    )
}

export default SidebarAndProfile
