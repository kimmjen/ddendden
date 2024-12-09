// app/admin/page.tsx
export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">대시보드</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">총 사용자</h3>
                    <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">총 콘텐츠</h3>
                    <p className="text-2xl font-bold">567</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">오늘의 방문자</h3>
                    <p className="text-2xl font-bold">89</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500">신규 게시물</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>
            </div>
        </div>
    );
}