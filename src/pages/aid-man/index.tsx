import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import type { FC } from "react"

interface AidManProps {}
const AidMan: FC<AidManProps> = () => {
    return (
        <div className="flex justify-center pt-5">
            <motion.button
                initial={{ translateY: "-100%" }}
                animate={{ translateY: "0%" }}
                className="btn-primary rounded-full px-10 flex gap-1 items-center"
            >
                Add Post <Sparkles size={"20px"} />
            </motion.button>
        </div>
    )
}

export default AidMan
