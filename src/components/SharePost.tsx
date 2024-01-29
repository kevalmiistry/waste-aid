import { useState, type FC } from "react"
import { Share2 } from "lucide-react"
import Modal from "./Modal"
import copy from "clipboard-copy"

const OPTIONS = [
    {
        key: "whatsapp",
        label: "Whatsapp",
        linkPrefix: "whatsapp://send?text=",
    },
    {
        key: "facebook",
        label: "Facebook",
        linkPrefix: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
        key: "x",
        label: "X (Twitter)",
        linkPrefix: "https://twitter.com/intent/tweet?text=",
    },
    {
        key: "linkedin",
        label: "Linkedin",
        linkPrefix: "https://www.linkedin.com/cws/share?url=",
    },
] as const

interface ISharePost {
    sharableLink: string
}
const SharePost: FC<ISharePost> = ({ sharableLink }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center rounded-full p-2 transition-all hover:bg-gray-200"
            >
                <Share2 size={"1.15rem"} />
            </button>

            <Modal onClose={() => setOpen(false)} open={open}>
                <div className="flex min-w-[250px] flex-col font-medium md:min-w-[350px] md:text-lg">
                    <p className="mb-2 text-center text-lg font-semibold md:text-xl">
                        Share this post via:
                    </p>

                    {OPTIONS.map((item) => (
                        <a
                            key={item.key}
                            href={`${item.linkPrefix}${sharableLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="border-b border-gray-500 py-2 text-center"
                        >
                            {item.label}
                        </a>
                    ))}
                    <button
                        className="py-2 text-center"
                        onClick={() => {
                            void copy(sharableLink)
                            setOpen(false)
                        }}
                    >
                        Copy Link
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default SharePost
