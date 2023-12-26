import type { ReactElement, ReactNode } from "react"
import type { AppProps, AppType } from "next/app"
import type { Session } from "next-auth"
import type { NextPage } from "next"
import { SessionProvider } from "next-auth/react"
import { SkeletonTheme } from "react-loading-skeleton"
import { useRouter } from "next/router"
import { api } from "~/utils/api"
import SidebarAndProfile from "~/components/SidebarAndProfile"
import NextTopLoader from "nextjs-toploader"
import React from "react"
import "~/styles/globals.css"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppType &
    AppProps<{ session: Session | null }> & {
        Component: NextPageWithLayout
    }

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
    const router = useRouter()
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <SessionProvider session={session}>
                <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ebebeb">
                    <NextTopLoader />
                    <SidebarAndProfile>
                        {React.cloneElement(page, { key: router.route })}
                    </SidebarAndProfile>
                </SkeletonTheme>
            </SessionProvider>
        ))

    return getLayout(
        <SessionProvider session={session}>
            <SkeletonTheme baseColor="#f2f2f2" highlightColor="#ebebeb">
                <NextTopLoader color="rgb(150, 217, 5)" />
                <Component {...pageProps} />
            </SkeletonTheme>
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
