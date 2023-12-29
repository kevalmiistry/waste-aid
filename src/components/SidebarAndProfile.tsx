import { Home, Recycle, ScanLine, UserCircle2, X } from "lucide-react"
import { useState, type FC, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { twMerge } from "tailwind-merge"
import ProfileSection from "./ProfileSection/ProfileSection"
import Notification from "./Notification/Notification"
import Link from "next/link"

interface ISidebarAndProfile {
    children: ReactNode
}

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    const [openProfile, setOpenProfile] = useState(false)

    return (
        <div className="min-h-[100dvh]">
            <Notification />
            <div className="relative flex min-h-[100dvh]">
                <div
                    aria-label="sidebar"
                    className={`md:h-dvh left-0 right-0 z-[2] hidden border-t bg-white p-5 text-xl font-medium shadow-[3px_-15px_82px_-25px_rgba(0,0,0,0.5)] transition-all md:sticky md:left-0 md:top-0 md:z-[2] md:block md:flex-[1.5] md:p-4 md:shadow-none`}
                >
                    <div className="flex justify-end">
                        <X size={"1.75rem"} className="md:hidden" />
                    </div>
                    <ul className="flex flex-col items-center gap-4">
                        <Link href={"/"}>
                            <li>Home</li>
                        </Link>
                        <Link href={"/aid-man"}>
                            <li>Aid-Man</li>
                        </Link>
                        <Link href={"/verify-token"}>
                            <li>Scan QR</li>
                        </Link>
                        <Link href={"/welcome"}>
                            <li>Welcome</li>
                        </Link>
                    </ul>
                </div>

                <div
                    aria-label="main-section"
                    className="z-[1] flex-[3] pb-16 md:border-l-[2px] md:border-r-[2px] md:pb-0"
                >
                    <div className="px-0 md:px-4">
                        <AnimatePresence>{children}</AnimatePresence>
                    </div>
                </div>

                <div
                    aria-label="profile"
                    className={twMerge(
                        "md:h-dvh fixed left-0 right-0 z-[2] h-3/4 bg-white transition-all md:sticky md:left-0 md:top-0 md:z-[2] md:flex-[2]",
                        openProfile
                            ? "bottom-0 overflow-auto rounded-t-2xl shadow-2xl"
                            : "-bottom-[150%] shadow-none"
                    )}
                >
                    <button
                        className={twMerge(
                            "fixed -bottom-[150%] right-5 z-10 md:hidden",
                            openProfile ? "bottom-[70%]" : "-bottom-[150%]"
                        )}
                        onClick={() => setOpenProfile(false)}
                    >
                        <X size={"1.75rem"} color="#333" />
                    </button>

                    <ProfileSection />
                </div>
            </div>

            {/*  */}
            <div
                aria-label="mobile-view-bottom-bar"
                className="fixed bottom-0 left-0 right-0 z-[1] flex justify-around border bg-white p-3 md:hidden"
            >
                <Link href={"/"}>
                    <Home />
                </Link>
                <Link href={"/aid-man"}>
                    <Recycle />
                </Link>
                <Link href={"/verify-token"}>
                    <ScanLine />
                </Link>
                <button onClick={() => setOpenProfile(true)}>
                    <UserCircle2 size={"1.75rem"} />
                </button>
            </div>
        </div>
    )
}

export default SidebarAndProfile
