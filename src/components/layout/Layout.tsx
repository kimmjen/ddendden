'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const pathname = usePathname();
    const { isAuthenticated, user } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    // 하이드레이션 이슈 방지
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // 로그인 페이지나 관리자 페이지에서는 기본 네비게이션/푸터 숨김
    const shouldHideNavFooter =
        pathname === '/login' ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/admin-super');

    return (
        <div className="min-h-screen flex flex-col bg-yellow-100">
            {!shouldHideNavFooter && <Navigation />}
            <main className="flex-1">
                {children}
            </main>
            {!shouldHideNavFooter && <Footer />}
        </div>
    );
};