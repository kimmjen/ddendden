'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getTranslation, Locale } from './index'
import { useLanguageStore } from '@/store/languageStore'

export function useTranslation() {
    const params = useParams()
    const { language, setLanguage } = useLanguageStore()

    // params.lang이 있을 때만 언어 업데이트
    useEffect(() => {
        if (params?.lang && params.lang !== language) {
            setLanguage(params.lang as Locale)
        }
    }, [params?.lang, language, setLanguage])

    return {
        t: (key: string) => getTranslation(language, key),
        locale: language
    }
}