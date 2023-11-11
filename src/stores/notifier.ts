import { create } from "zustand"

type TStatus = "success" | "error" | "warning" | "info"
interface TNotifyObj {
    show: boolean
    message: string
    status?: TStatus
    duration?: number
}
type Store = {
    show: boolean
    notify: (notifyObj: TNotifyObj) => void
    message: string
    status: TStatus
}

export const useNotifierStore = create<Store>()((set) => ({
    show: false,
    notify: ({ show, message, status = "info", duration = 3000 }) => {
        set(() => ({ show, message, status }))
        setTimeout(() => {
            set(() => ({ show: false, message: "" }))
        }, duration)
    },
    message: "",
    status: "info",
}))
