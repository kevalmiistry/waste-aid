import { Home, Recycle, ScanLine, UserCircle2, X } from "lucide-react"
import { useState, type FC, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import ProfileSection from "./ProfileSection/ProfileSection"
import Link from "next/link"

interface ISidebarAndProfile {
    children: ReactNode
}

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    const [openProfile, setOpenProfile] = useState(false)

    return (
        <div className="min-h-[100dvh]">
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
                        <Drawer.Root shouldScaleBackground>
                            {/* --------------- */}
                            <div
                                aria-label="mobile-view-bottom-bar"
                                className="fixed bottom-0 left-0 right-0 z-[10] flex justify-around border bg-white p-3 md:hidden"
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
                                <Drawer.Trigger>
                                    <UserCircle2 size={"1.75rem"} />
                                </Drawer.Trigger>
                            </div>
                            {/* --------------- */}

                            <Drawer.Portal>
                                <Drawer.Overlay className="fixed inset-0 z-[20] bg-black/40" />
                                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[20] mt-24 flex h-full max-h-[75%] flex-col rounded-t-[10px] bg-white">
                                    <div className="mx-auto mt-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />

                                    <ProfileSection />
                                </Drawer.Content>
                                <Drawer.Overlay />
                            </Drawer.Portal>
                        </Drawer.Root>

                        <AnimatePresence>{children}</AnimatePresence>
                    </div>
                </div>

                <div
                    aria-label="profile"
                    className={
                        "md:h-dvh left-0 right-0 z-[2] hidden h-3/4 bg-white transition-all md:sticky md:left-0 md:top-0 md:z-[2] md:block md:flex-[2]"
                    }
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
        </div>
    )
}

export default SidebarAndProfile
