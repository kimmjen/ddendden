import { useState } from "react";
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { useRouter } from 'next/navigation';
import {useTranslation} from "@/i18n/client";
import {useLanguageStore} from "@/store/languageStore";
import {useAuthStore} from "@/store/useAuthStore";
import {Locale} from "@/i18n";

export const Navigation = () => {
    const router = useRouter();
    const { language, setLanguage } = useLanguageStore();
    const { t } = useTranslation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const handleLanguageChange = () => {
        const newLang: Locale = language === 'ko' ? 'en' : 'ko';
        setLanguage(newLang);
    }
    const handleLogout = () => {
        logout();
        // 필요한 경우 리다이렉트 추가
    };

    return (
        <nav className="bg-white shadow-sm p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/*<Menu className="h-6 w-6 text-gray-600" />*/}
                    <Link href="/" className="text-2xl font-bold text-pink-500">
                        뜬뜬
                    </Link>
                </div>
                <div className="flex items-center space-x-8">
                    <Link href="/community" className="text-gray-700 hover:text-pink-500">
                        {t('navigation.community')}
                    </Link>
                    <Link href="/punghyanggo" className="text-gray-700 hover:text-pink-500">
                        {t('navigation.punghyanggo')}
                    </Link>
                    <Link href="/pinggyego" className="text-gray-700 hover:text-pink-500">
                        {t('navigation.pinggyego')}
                    </Link>
                    <Link href="/monthly" className="text-gray-700 hover:text-pink-500">
                        {t('navigation.monthly')}
                    </Link>
                    <Link href="/awards" className="text-gray-700 hover:text-pink-500">
                        {t('navigation.award')}
                    </Link>
                    <Link href="/message" className="text-gray-700 hover:text-pink-500">
                        Message
                    </Link>
                    <div className="relative">
                        <button
                            className="font-medium"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            {t('navigation.award')}
                        </button>

                        {isDropdownOpen && (
                            <div
                                className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <Link
                                    href="/award/2024"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    제2회 핑계고 시상식
                                </Link>
                                <Link
                                    href="/award/2023"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    제1회 핑계고 시상식
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Search className="h-5 w-5 text-gray-600"/>
                    {isAuthenticated ? (
                        <>
                                <span className="text-gray-700">
                                    {user?.name}님 환영합니다
                                </span>
                            {user?.type === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    관리자 페이지
                                </Link>
                            )}
                            {user?.type === 'superAdmin' && (
                                <Link
                                    href="/admin-super"
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    슈퍼관리자 페이지
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-gray-900"
                            >
                                {t('logout')}
                            </button>
                        </>
                    ) : (
                        <Link href="/login">
                            <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                                {t('login')}
                            </button>
                        </Link>
                    )}
                    <button
                        onClick={handleLanguageChange}
                        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 flex items-center justify-center"
                        aria-label={`Change language to ${language === 'ko' ? 'English' : 'Korean'}`}
                    >
                        {language === 'ko' ? (
                            <ReactCountryFlag
                                countryCode="KR"
                                svg
                                style={{
                                    width: '1.5em',
                                    height: '1.5em'
                                }}
                            />
                        ) : (
                            <ReactCountryFlag
                                countryCode="US"
                                svg
                                style={{
                                    width: '1.5em',
                                    height: '1.5em'
                                }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};