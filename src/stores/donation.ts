import { create } from "zustand"

type Store = {
    renderer: number
    handleDonationRender: () => void
}

export const useDonationStore = create<Store>()((set) => ({
    renderer: 0,
    handleDonationRender: () => {
        set(({ renderer }) => ({ renderer: renderer + 1 }))
    },
}))
