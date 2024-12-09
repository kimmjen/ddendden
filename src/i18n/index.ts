// src/i18n/index.ts
import translations from '../../public/locales/translation.json'

export type Locale = keyof typeof translations

// translations.ko의 타입을 자동으로 추론
type TranslationStructure = typeof translations['ko']

// 중첩된 객체의 path를 string으로 표현하는 타입
type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`
type DotNestedKeys<T> = (T extends object ?
    { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
    : '') extends infer D ? Extract<D, string> : never;

export type TranslationKey = DotNestedKeys<TranslationStructure>

export function getTranslation(locale: Locale, key: string) {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
        if (value?.[k] === undefined) return key
        value = value[k]
    }

    return value
}

export type TranslationType = {
    [K in Locale]: TranslationStructure
}