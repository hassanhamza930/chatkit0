import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { create } from 'zustand';

interface SidebarState {
    isOpen: boolean;
    isMobile: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    return {
        isOpen: !isMobile,
        isMobile,
        toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    };
});

export function useSidebar() {
    const { isOpen, isMobile, toggleSidebar } = useSidebarStore();
    
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            useSidebarStore.setState({ 
                isMobile: mobile,
                isOpen: !mobile
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isOpen,
        toggleSidebar,
        isMobile
    };
}
