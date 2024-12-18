// app/admin/contents/new/page.tsx
export default function NewContentPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">새 콘텐츠 작성</h1>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    취소
                </button>
            </div>

            <form className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="제목을 입력하세요"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea
                        className="w-full h-64 px-4 py-2 border rounded-lg resize-none"
                        placeholder="내용을 입력하세요"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        게시하기
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        임시저장
                    </button>
                </div>
            </form>
        </div>
    );
}