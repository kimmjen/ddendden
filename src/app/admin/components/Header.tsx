'use client'

export function Header() {
    return (
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">대시보드</h2>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">
                    <span>알림</span>
                </button>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">관리자</span>
                    <button className="text-sm text-red-600 hover:text-red-700">
                        로그아웃
                    </button>
                </div>
            </div>
        </header>
    )
}