// app/admin-super/page.tsx
export default function SuperAdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">시스템 대시보드</h1>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">관리자 수</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">서버 상태</h3>
                    <p className="text-2xl font-bold text-green-500">정상</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">오늘의 로그</h3>
                    <p className="text-2xl font-bold">89</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">시스템 사용량</h3>
                    <p className="text-2xl font-bold">45%</p>
                </div>
            </div>

            {/* 최근 활동 로그 */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">최근 시스템 활동</h2>
                <div className="space-y-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="p-3 bg-gray-50 rounded">
                            <p className="text-sm text-gray-600">2024-03-07 14:30:00</p>
                            <p>시스템 설정 변경: 로그인 정책 업데이트</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}