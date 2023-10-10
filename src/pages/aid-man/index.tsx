import { motion } from "framer-motion"
import { Sparkles, X } from "lucide-react"
import { useState, type FC } from "react"
import Modal from "~/components/Modal/Modal"

interface AidManProps {}
const AidMan: FC<AidManProps> = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="flex justify-center pt-5">
            <motion.button
                initial={{ translateY: "-100%" }}
                animate={{ translateY: "0%" }}
                className="btn-primary flex items-center gap-1 rounded-full px-10"
                onClick={() => setModalOpen(true)}
            >
                Add Post <Sparkles size={"20px"} />
            </motion.button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="relative h-[85vh] w-[80vw] sm:w-[600px]">
                    <X
                        tabIndex={1}
                        className="absolute right-0 top-0 cursor-pointer"
                        onClick={() => setModalOpen(false)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default AidMan
