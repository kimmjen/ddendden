// src/store/languageStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Locale } from '@/i18n'

interface LanguageState {
    language: Locale
    setLanguage: (language: Locale) => void
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'ko',
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'language-storage',
        }
    )
)