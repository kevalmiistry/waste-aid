import type { ReactElement } from "react"
import type { NextPageWithLayout } from "../_app"

interface IWelcome {}
const Welcome: NextPageWithLayout<IWelcome> = () => {
    return <>this is landing page</>
}

Welcome.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>
}

export default Welcome
