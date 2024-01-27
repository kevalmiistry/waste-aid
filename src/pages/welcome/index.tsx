import type { NextPageWithLayout } from "../_app"
import type { ReactElement } from "react"
import { WAFullLogo } from "~/components/WALogos"
import { signIn } from "next-auth/react"
import { Heart } from "lucide-react"
import GoogleIcon from "~/components/GoogleIcon"
import S from "./Welcome.module.scss"

const STEPS = [
    {
        text: "Aidman creates a post asking for donation",
        src: "/steps/step_one.svg",
        alt: "step one",
    },
    {
        text: "Users generate token for their donation",
        src: "/steps/step_two.svg",
        alt: "step two",
    },
    {
        text: "Then attach the QR code with donation parcel",
        src: "/steps/step_three.svg",
        alt: "step three",
    },
    {
        text: "Aidman receives the donation parcel with QR code",
        src: "/steps/step_four.svg",
        alt: "step four",
    },
    {
        text: "Aidman scans the QR code",
        src: "/steps/step_five.svg",
        alt: "step five",
    },
    {
        text: "Donator gets acknowledgement for their donation!",
        src: "/steps/step_six.svg",
        alt: "step six",
    },
]

interface IWelcome {}
const Welcome: NextPageWithLayout<IWelcome> = () => {
    const scrollToElement = () => {
        const element = document.getElementById("section-2")
        element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <main
            id="landing-page"
            className={`min-h-screen ${S.main} overflow-x-hidden text-[#333]`}
        >
            <section
                id="hero"
                className="flex min-h-screen flex-col justify-between md:gap-9 lg:flex-row"
            >
                <div className="z-[10] flex flex-[3] flex-col items-center justify-center gap-4 pl-[0rem] md:flex-[1.25] lg:items-start xl:pl-[6rem]">
                    <WAFullLogo className="absolute left-5 top-5 md:left-10 md:top-10" />
                    <h1 className="text-[4rem] font-extrabold text-primary md:text-[4rem] lg:text-[6rem]">
                        Waste-Aid
                    </h1>
                    <p className="pl-1 text-center text-2xl font-medium text-gray-800 md:text-start">
                        Because someone’s waste is someone’s treasure!
                    </p>
                    <div className="mt-3 flex flex-wrap gap-5">
                        <button
                            className="btn-primary"
                            onClick={scrollToElement}
                        >
                            Know More
                        </button>
                        <button
                            onClick={() =>
                                void signIn("google", {
                                    callbackUrl: "/",
                                })
                            }
                            className="btn-secondary flex gap-1"
                        >
                            <GoogleIcon />
                            SignIn With Google
                        </button>
                    </div>
                </div>
                <div className="relative flex flex-[5] justify-start md:flex-1 md:items-end md:justify-center">
                    <div className={`${S.earth_bg_effects}`} />
                    <img
                        className={`${S.earth_img} absolute left-5 top-1/2 z-[10] w-[325px] -translate-y-1/2 object-contain md:static md:w-[450px] lg:absolute`}
                        src="/earth.png"
                        alt="Earth Image"
                    />
                </div>
            </section>

            <section
                id="section-2"
                className="relative flex min-h-screen flex-col items-center justify-center gap-5 px-5 pt-40 md:pt-0"
            >
                <div className={S.side_shadow_left} />
                <div className={S.side_shadow_right} />

                <h2 className="text-3xl font-semibold">How does it work?</h2>

                <div className="grid grid-cols-1 gap-10 text-xl font-medium md:grid-cols-3">
                    {STEPS.map((step) => (
                        <div
                            key={step.alt}
                            className="relative z-10 flex max-w-full items-center gap-4 rounded-xl border-2 border-[#333] bg-white p-3 shadow-[4px_5px_0px_0px_#333] odd:flex-row-reverse md:block md:aspect-[10/7] md:max-w-[280px]"
                        >
                            <img
                                src={step.src}
                                alt={step.alt}
                                className="bottom-0 right-0 z-0 h-[125px] w-[125px] object-contain md:absolute"
                            />
                            <p className="z-10">{step.text}</p>
                        </div>
                    ))}
                </div>
                <h2 className="text-3xl font-semibold">
                    As simple as that! :D
                </h2>
            </section>

            <footer className="mt-10 flex items-center justify-center py-6 md:mt-0">
                <p className="flex w-fit items-center justify-center gap-1 border-t border-[#666] py-3 text-center text-xl">
                    Made with <Heart fill="#333" color="#333" /> By
                    <a
                        href="https://kevalmiistry.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        @KevalMiistry
                    </a>
                </p>
            </footer>
        </main>
    )
}

Welcome.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>
}

export default Welcome
