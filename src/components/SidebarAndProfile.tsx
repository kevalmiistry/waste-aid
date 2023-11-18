import { useState, type FC, type ReactNode } from "react"
import ProfileSection from "./ProfileSection/ProfileSection"
import Notification from "./Notification/Notification"
import Link from "next/link"
import { Menu, UserCircle2 } from "lucide-react"

interface ISidebarAndProfile {
    children: ReactNode
}

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    const [openProfile, setOpenProfile] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className="h-screen overflow-hidden">
            <Notification />
            <div className="flex h-screen">
                <div
                    aria-label="sidebar"
                    className="absolute z-[2] bg-white md:static md:flex-[1.5] md:p-4"
                >
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
                    className="flex-[3] border-l-[2px] border-r-[2px] pr-1"
                >
                    <div className="custom-scrollbar h-screen overflow-x-auto">
                        {children}
                        <div
                            aria-label="mobile-view-bottom-bar"
                            className="absolute bottom-0 left-0 right-0 flex justify-around border p-3 md:hidden"
                        >
                            <button onClick={() => setOpenMenu(true)}>
                                <Menu size={"1.75rem"} />
                            </button>
                            <button onClick={() => setOpenProfile(true)}>
                                <UserCircle2 size={"1.75rem"} />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    aria-label="profile"
                    className={`absolute left-0 right-0 z-[2] bg-white transition-all md:static md:flex-[2] ${
                        openProfile ? "top-0" : "-top-full"
                    }`}
                >
                    <ProfileSection setOpenProfile={setOpenProfile} />
                </div>
            </div>
        </div>
    )
}

export default SidebarAndProfile
