import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Admin sidebar
  adminSidebarOpen: boolean;
  setAdminSidebarOpen: (open: boolean) => void;
  toggleAdminSidebar: () => void;

  // Modals
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Theme
        theme: 'system',
        setTheme: (theme) => set({ theme }),

        // Admin sidebar
        adminSidebarOpen: true,
        setAdminSidebarOpen: (open) => set({ adminSidebarOpen: open }),
        toggleAdminSidebar: () => set((state) => ({ adminSidebarOpen: !state.adminSidebarOpen })),

        // Modals
        activeModal: null,
        openModal: (modalId) => set({ activeModal: modalId }),
        closeModal: () => set({ activeModal: null }),

        // Mobile menu
        mobileMenuOpen: false,
        setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
        toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      }),
      {
        name: 'ui-storage', // localStorage key
        partialize: (state) => ({ theme: state.theme, adminSidebarOpen: state.adminSidebarOpen }), // Only persist these
      }
    ),
    { name: 'UIStore' }
  )
);
