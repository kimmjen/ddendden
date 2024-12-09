'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { path: '/admin', label: '대시보드' },
    { path: '/admin/contents', label: '콘텐츠 관리' },
    { path: '/admin/users', label: '사용자 관리' },
    { path: '/admin/awards', label: '시상식 관리' },
]

// 클라이언트 컴포넌트로 분리

function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="space-y-2">
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`block p-2 rounded transition-colors
                        ${pathname === item.path
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-800'}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

// 서버 컴포넌트
export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid grid-cols-[250px_1fr]">
            {/* 사이드바 */}
            <aside className="bg-[#1a1a1a] text-white p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold">뜬뜬 관리자</h1>
                </div>
                <Navigation />
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}