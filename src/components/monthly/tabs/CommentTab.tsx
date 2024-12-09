import { useEffect, useState } from "react";

export const CommentTab = () => {
    // 댓글 관련 상태 관리
    const [comments, setComments] = useState([]);

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-6">
                            <textarea
                                placeholder="댓글을 작성해주세요"
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows={3}
                            />
                <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">
                        작성하기
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {/* 댓글 목록 */}
                <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"/>
                        <div>
                            <p className="font-medium">계원123</p>
                            <p className="text-sm text-gray-500">2시간 전</p>
                        </div>
                    </div>
                    <p className="text-gray-600">재미있게 보고 있습니다!</p>
                </div>
            </div>
        </div>
    );
};