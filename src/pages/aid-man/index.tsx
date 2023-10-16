import { useState, type FC } from "react"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import PostAddUpdate from "~/components/PostAddUpdate/PostAddUpdate"
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
                <PostAddUpdate
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
            </Modal>
        </div>
    )
}

export default AidMan
