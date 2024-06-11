import { create } from "zustand"

type SidebarState = {
    isOpen: boolean
    toggle: () => void
}

export const useSidebar = create<SidebarState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}))