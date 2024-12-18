'use client'

import {Header} from "@/app/admin/components/Header";
import {Navigation} from "@/app/admin/components/Navigation";

// AdminLayout 컴포넌트 수정
export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid grid-cols-[250px_1fr]">
            {/* 사이드바 */}
            <aside className="bg-[#1a1a1a] text-white p-4 flex flex-col">
                <div className="mb-8 px-3 py-4">
                    <h1 className="text-xl font-bold">뜬뜬 관리자</h1>
                </div>
                <Navigation />
                <div className="mt-auto p-3">
                    <div className="text-sm text-gray-400">
                        <p>Version 1.0.0</p>
                    </div>
                </div>
            </aside>

            {/* 메인 영역 */}
            <div className="flex flex-col">
                <Header />
                <main className="p-8 bg-gray-50 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}