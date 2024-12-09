// app/admin-super/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SuperAdminLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const menuItems = [
        { path: '/admin-super', label: '대시보드' },
        { path: '/admin-super/admins', label: '관리자 관리' },
        { path: '/admin-super/settings', label: '시스템 설정' },
        { path: '/admin-super/logs', label: '시스템 로그' }
    ];

    return (
        <div className="min-h-screen grid grid-cols-[250px_1fr]">
            {/* 사이드바 */}
            <aside className="bg-[#1a1a1a] text-white p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold">슈퍼 관리자</h1>
                    <p className="text-sm text-gray-400 mt-2">시스템 관리 페이지</p>
                </div>
                <nav className="space-y-2">
                    {menuItems.map(item => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block p-2 rounded ${
                                pathname === item.path
                                    ? 'bg-[#FF6B6B] text-white'
                                    : 'hover:bg-gray-800'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}

