'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    Layout,
    LayoutDashboard,
    Users,
    Settings,
    Trophy,
    ChevronDown,
    ChevronUp,
    FileText,
    LogOut,
} from 'lucide-react';

export default function SuperAdminLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isAwardsOpen, setIsAwardsOpen] = useState(false); // Awards 드롭다운 상태 관리

    const menuItems = [
        { path: '/admin-super', label: '대시보드', icon: LayoutDashboard },
        { path: '/admin-super/admins', label: '관리자 관리', icon: Users },
        {
            label: '시상식 관리',
            icon: Trophy,
            subItems: [
                { path: '/admin-super/awards', label: '시상식 전체' },
                { path: '/admin-super/awards/2023', label: '2023 시상식' },
                { path: '/admin-super/awards/2024', label: '2024 시상식' },
            ],
        },
        { path: '/admin-super/settings', label: '시스템 설정', icon: Settings },
        { path: '/admin-super/logs', label: '시스템 로그', icon: FileText },
    ];

    const handleLogout = () => {
        // 로그아웃 로직
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Layout className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-semibold text-gray-900">
                                SuperAdmin
                            </span>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200">
                    <nav className="mt-5 px-2">
                        <div className="space-y-1">
                            {menuItems.map(({ path, label, icon: Icon, subItems }) => {
                                const isActive = pathname === path;
                                if (subItems) {
                                    return (
                                        <div key={label}>
                                            <button
                                                onClick={() => setIsAwardsOpen(!isAwardsOpen)}
                                                className={`
                          group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg w-full
                          ${
                                                    isAwardsOpen
                                                        ? 'bg-indigo-50 text-indigo-600'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }
                        `}
                                            >
                                                <div className="flex items-center">
                                                    <Icon
                                                        className={`
                            mr-3 h-5 w-5
                            ${
                                                            isAwardsOpen
                                                                ? 'text-indigo-600'
                                                                : 'text-gray-400 group-hover:text-gray-500'
                                                        }
                          `}
                                                    />
                                                    {label}
                                                </div>
                                                {isAwardsOpen ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                            {isAwardsOpen && (
                                                <div className="ml-8 space-y-1">
                                                    {subItems.map(({ path, label }) => (
                                                        <Link
                                                            key={path}
                                                            href={path}
                                                            className={`
                                  flex items-center px-3 py-2 text-sm font-medium rounded-lg
                                  ${
                                                                pathname === path
                                                                    ? 'bg-indigo-100 text-indigo-600'
                                                                    : 'text-gray-700 hover:bg-gray-50'
                                                            }
                                `}
                                                        >
                                                            {label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={path}
                                        href={path}
                                        className={`
                      group flex items-center px-3 py-3 text-sm font-medium rounded-lg
                      ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }
                    `}
                                    >
                                        <Icon
                                            className={`
                      mr-3 h-5 w-5
                      ${
                                                isActive
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400 group-hover:text-gray-500'
                                            }
                    `}
                                        />
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
