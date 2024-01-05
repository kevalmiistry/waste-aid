import { Home, Recycle, ScanLine, UserCircle2, X } from "lucide-react"
import { useState, type FC, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"
import { WAFullLogo } from "./WALogos"
import { Drawer } from "vaul"
import ProfileSection from "./ProfileSection/ProfileSection"
import Link from "next/link"

interface ISidebarAndProfile {
    children: ReactNode
}

const MENUS = [
    {
        label: "Home",
        icon: <Home size={"1.5rem"} />,
        link: "/home",
    },
    {
        label: "Aid-Man",
        icon: <Recycle size={"1.5rem"} />,
        link: "/aid-man",
    },
    {
        label: "Scan QR",
        icon: <ScanLine size={"1.5rem"} />,
        link: "/verify-token",
    },
]

const SidebarAndProfile: FC<ISidebarAndProfile> = ({ children }) => {
    const [openProfile, setOpenProfile] = useState(false)
    const { pathname } = useRouter()

    const getActiveLinkClassName = (link: string) =>
        pathname === link ? "bg-slate-100 font-semibold" : ""

    return (
        <div className="min-h-[100dvh]">
            <div className="relative flex min-h-[100dvh]">
                <div
                    aria-label="sidebar"
                    className={`md:h-dvh left-0 right-0 z-[2] hidden border-t bg-white p-5 text-xl font-medium shadow-[3px_-15px_82px_-25px_rgba(0,0,0,0.5)] transition-all md:sticky md:left-0 md:top-0 md:z-[2] md:flex md:h-screen md:flex-[1.5] md:justify-center md:p-4 md:shadow-none`}
                >
                    <div aria-label="wrapper" className="w-fit">
                        <div className="flex justify-end">
                            <X size={"1.75rem"} className="md:hidden" />
                        </div>

                        <WAFullLogo className="mt-2" />

                        <ul className="mt-10 flex flex-col items-start gap-2 text-xl font-medium">
                            {MENUS.map((menu) => (
                                <li key={menu.link}>
                                    <Link
                                        href={menu.link}
                                        className={twMerge(
                                            "flex items-center gap-2 rounded-full px-6 py-3 transition-all duration-300 hover:bg-slate-100",
                                            getActiveLinkClassName(menu.link)
                                        )}
                                    >
                                        {menu.icon}
                                        {menu.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
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
                                <Link href={"/home"}>
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
