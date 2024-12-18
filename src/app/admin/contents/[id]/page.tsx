// app/admin/contents/[id]/page.tsx
export default function ContentDetailPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">콘텐츠 상세</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        수정
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        삭제
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <div>
                    <h2 className="text-xl font-bold">제목이 들어갑니다</h2>
                    <p className="text-sm text-gray-500 mt-2">2024-03-12 작성</p>
                </div>

                <div className="prose max-w-none">
                    <p>콘텐츠 내용이 들어갑니다...</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 이미지 표시 영역 */}
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">콘텐츠 정보</h3>
                    <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-gray-500">상태</dt>
                            <dd>게시됨</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">최종 수정일</dt>
                            <dd>2024-03-12 15:30</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}