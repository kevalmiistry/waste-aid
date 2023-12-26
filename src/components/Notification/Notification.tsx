import { type FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNotifierStore } from "~/stores/notifier"
import { cubicBezier } from "~/utils/constants"

const colors = {
    success: "#00c851",
    error: "#ff4444",
    warning: "#ffbb33",
    info: "#33b5e5",
}

interface INotification {}
const Notification: FC<INotification> = () => {
    const { show, message, status } = useNotifierStore()

    return (
        <div>
            <AnimatePresence>
                {show ? (
                    <motion.div
                        key={"notification"}
                        initial={{
                            translateY: "-100%",
                            backgroundColor: colors[status],
                        }}
                        animate={{
                            translateY: "0%",
                            backgroundColor: colors[status],
                        }}
                        exit={{
                            translateY: "-100%",
                            backgroundColor: colors[status],
                        }}
                        transition={{ ease: cubicBezier }}
                        className={`absolute left-0 right-0 top-0 z-[1000000] m-0 w-full py-[2px] text-center font-medium text-[#333]`}
                    >
                        {message}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}

export default Notification
