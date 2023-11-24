import type { FC, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { cubicBezier } from "~/utils/constants"
import { twMerge } from "tailwind-merge"

interface IModal {
    children: ReactNode
    open: boolean
    onClose: () => void
    classNames?: string
}

const Modal: FC<IModal> = ({ children, open, onClose, classNames = "" }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    const c = twMerge(
        "fixed left-1/2 top-1/2 z-[2] rounded-3xl bg-white p-5 shadow-lg",
        classNames
    )
    // console.log(c)

    return isMounted
        ? createPortal(
              <AnimatePresence>
                  {open ? (
                      <>
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ ease: cubicBezier, duration: 0.3 }}
                              className="z-1 absolute inset-0 bg-[#00000050]"
                              onClick={onClose}
                          />
                          <motion.div
                              initial={{
                                  opacity: 0,
                                  scale: 0.95,
                                  translateX: "-50%",
                                  translateY: "-50%",
                              }}
                              animate={{
                                  opacity: 1,
                                  scale: 1,
                                  translateX: "-50%",
                                  translateY: "-50%",
                              }}
                              exit={{
                                  opacity: 0,
                                  scale: 0.95,
                                  translateX: "-50%",
                                  translateY: "-50%",
                              }}
                              transition={{ ease: cubicBezier, duration: 0.3 }}
                              className={c}
                          >
                              {children}
                          </motion.div>
                      </>
                  ) : null}
              </AnimatePresence>,
              document.querySelector("#my-portal")!
          )
        : null
}

export default Modal
