import type { FC } from "react"
import { Home, Recycle, ScanLine, UserCircle2 } from "lucide-react"
import { Drawer } from "vaul"
import ProfileSection from "./ProfileSection/ProfileSection"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface IMobileNavbar {}
const MobileNavbar: FC<IMobileNavbar> = () => {
    const { status } = useSession()

    if (status === "unauthenticated" || status === "loading") {
        return null
    }

    return (
        <Drawer.Root shouldScaleBackground>
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

            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-[20] bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[20] mt-24 flex h-full max-h-[75%] flex-col rounded-t-[10px] bg-white">
                    <div className="mx-auto mt-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />

                    <ProfileSection />
                </Drawer.Content>
                <Drawer.Overlay />
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default MobileNavbar
