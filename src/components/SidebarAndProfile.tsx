import type { FC, ReactNode } from "react"
import ProfileSection from "./ProfileSection/ProfileSection"
import Link from "next/link"

interface ISidebarAndProfile {
    children: ReactNode
}

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    return (
        <>
            <div className="flex h-screen">
                <div aria-label="sidebar" className="flex-[1.5] p-4">
                    <ul>
                        <Link href={"/"}>
                            <li>Home</li>
                        </Link>
                        <Link href={"/aid-man"}>
                            <li>Aid-Man</li>
                        </Link>
                        <Link href={"/welcome"}>
                            <li>Welcome</li>
                        </Link>
                    </ul>
                </div>
                <div
                    aria-label="main-section"
                    className="flex-[3] border-l-[2px] border-r-[2px]"
                >
                    {children}
                </div>
                <div aria-label="profile" className="flex-[2]">
                    <ProfileSection />
                </div>
            </div>
        </>
    )
}

export default SidebarAndProfile
