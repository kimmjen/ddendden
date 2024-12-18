'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Post {
    post_id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    createdAt: string
    vote_count: string
    images: string[]
    poll_data: any | null
    id: number
}

export default function PostDetailPage() {
    const params = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)

    // 실제로는 API 호출로 대체됩니다
    useEffect(() => {
        // 임시 데이터
        setPost({
            post_id: "UgkxztZ5oKLS5dIHeepsVMFN7zF8dE3gUp7u",
            author: {
                name: "뜬뜬 DdeunDdeun",
                avatar: "/images/avatar.webp"
            },
            content: "🎤귀성길은 핑계고🎤\r\n\r\n오늘(9/27) 오후 5시 즈음...",
            createdAt: "1년 전(수정됨)",
            vote_count: "5천",
            images: ["https://yt3.ggpht.com/..."],
            poll_data: null,
            id: 88
        })
        setLoading(false)
    }, [params.id])

    if (loading) return <div>로딩중...</div>
    if (!post) return <div>게시글을 찾을 수 없습니다.</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시글 상세</h1>
                <div className="flex gap-2">
                    <Link
                        href={`/admin/posts/${params.id}/edit`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        수정
                    </Link>
                    <Link
                        href="/admin/posts"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        목록
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <div className="font-medium">{post.author.name}</div>
                        <div className="text-sm text-gray-500">{post.createdAt}</div>
                    </div>
                    <div className="ml-auto">
                        좋아요 {post.vote_count}
                    </div>
                </div>

                <div className="mb-6 whitespace-pre-wrap">{post.content}</div>

                {post.images.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="font-medium">첨부된 이미지</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {post.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`게시글 이미지 ${index + 1}`}
                                    className="rounded w-full object-cover"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}