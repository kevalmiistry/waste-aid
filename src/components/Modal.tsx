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
    overlayClassName?: string
    placeDirectChildren?: boolean
}

const Modal: FC<IModal> = ({
    children,
    open,
    onClose,
    classNames = "",
    overlayClassName = "",
    placeDirectChildren = false,
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    const c = twMerge(
        "fixed left-1/2 top-1/2 z-[5] rounded-3xl bg-white p-5 shadow-lg",
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
                              className={twMerge(
                                  "fixed inset-0 z-[4] bg-[#00000050]",
                                  overlayClassName
                              )}
                              onClick={onClose}
                          />
                          {placeDirectChildren ? (
                              children
                          ) : (
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
                                  transition={{
                                      ease: cubicBezier,
                                      duration: 0.3,
                                  }}
                                  className={c}
                              >
                                  {children}
                              </motion.div>
                          )}
                      </>
                  ) : null}
              </AnimatePresence>,
              document.querySelector("#my-portal")!
          )
        : null
}

export default Modal
