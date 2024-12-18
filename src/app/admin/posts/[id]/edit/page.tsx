'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface PostFormData {
    content: string
    images: string[]
}

export default function PostEditPage() {
    const params = useParams()
    const router = useRouter()
    const [formData, setFormData] = useState<PostFormData>({
        content: '',
        images: []
    })
    const [loading, setLoading] = useState(true)

    // 실제로는 API 호출로 대체됩니다
    useEffect(() => {
        setFormData({
            content: "🎤귀성길은 핑계고🎤\r\n\r\n오늘(9/27) 오후 5시 즈음...",
            images: ["https://yt3.ggpht.com/..."]
        })
        setLoading(false)
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // API 호출로 데이터 업데이트
        console.log('수정된 데이터:', formData)
        router.push(`/admin/posts/${params.id}`)
    }

    const handleCancel = () => {
        router.back()
    }

    if (loading) return <div>로딩중...</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시글 수정</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded shadow p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                내용
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    content: e.target.value
                                }))}
                                className="w-full h-48 px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                현재 이미지
                            </label>
                            <div className="grid grid-cols-4 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`이미지 ${index + 1}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== index)
                                            }))}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            수정 완료
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}