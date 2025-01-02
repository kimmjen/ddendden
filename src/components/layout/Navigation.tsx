import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, Globe, LogOut } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { useLanguageStore } from '@/store/languageStore';
import { useAuthStore } from '@/store/useAuthStore';

export const Navigation = () => {
    const { language, setLanguage } = useLanguageStore();
    const { t } = useTranslation();
    const { user, isAuthenticated, logout } = useAuthStore();

    const [isAwardDropdownOpen, setIsAwardDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const awardDropdownRef = useRef<HTMLDivElement | null>(null);
    const profileDropdownRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            awardDropdownRef.current &&
            !awardDropdownRef.current.contains(event.target as Node)
        ) {
            setIsAwardDropdownOpen(false);
        }
        if (
            profileDropdownRef.current &&
            !profileDropdownRef.current.contains(event.target as Node)
        ) {
            setIsProfileDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-sm p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
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
                    <Link href="/message" className="text-gray-700 hover:text-pink-500">
                        Message
                    </Link>
                    <div className="relative" ref={awardDropdownRef}>
                        <button
                            onClick={() =>
                                setIsAwardDropdownOpen(!isAwardDropdownOpen)
                            }
                            className="text-gray-700 hover:text-pink-500 font-medium"
                        >
                            {t('navigation.award')}
                        </button>
                        {isAwardDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                                <Link
                                    href="/award/2024"
                                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    {t('navigation.award2024')}
                                </Link>
                                <Link
                                    href="/award/2023"
                                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    {t('navigation.award2023')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <div className="relative" ref={profileDropdownRef}>
                            {/* 프로필 드롭다운 */}
                            <button
                                onClick={() =>
                                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                                }
                                className="flex items-center space-x-2"
                            >
                                <span className="text-gray-700 hover:text-pink-500">{user?.name || 'User'}</span>
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                                    >
                                        <User className="h-5 w-5 text-gray-500" />
                                        <span>프로필</span>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setLanguage(language === 'ko' ? 'en' : 'ko')
                                        }
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                                    >
                                        <Globe className="h-5 w-5 text-gray-500" />
                                        <span>
                                            {language === 'ko' ? 'English' : '한국어'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center space-x-2"
                                    >
                                        <LogOut className="h-5 w-5 text-gray-500" />
                                        <span>로그아웃</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600">
                                {t('login')}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
