// app/admin-super/page.tsx
'use client';

import { Activity, Users, Server, Gauge } from 'lucide-react';

export default function SuperAdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">시스템 대시보드</h1>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-violet-50 rounded-lg">
                            <Users className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">관리자 수</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <Server className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">서버 상태</p>
                            <p className="text-2xl font-bold text-emerald-600">정상</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">오늘의 로그</p>
                            <p className="text-2xl font-bold text-gray-900">89</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-lg">
                            <Gauge className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">시스템 사용량</p>
                            <p className="text-2xl font-bold text-gray-900">45%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 최근 활동 로그 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">최근 시스템 활동</h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {[1,2,3].map(i => (
                        <div key={i} className="p-6">
                            <time className="text-sm text-gray-500">2024-03-07 14:30:00</time>
                            <p className="mt-1 text-gray-900">시스템 설정 변경: 로그인 정책 업데이트</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}