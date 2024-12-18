'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Author {
    name: string
    avatar: string
}

interface Post {
    post_id: string
    author: Author
    content: string
    createdAt: string
    vote_count: string
    images: string[]
    poll_data: any | null
    id: number
}

export default function PostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFilter, setTimeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10; // 페이지당 게시글 수

    useEffect(() => {
        fetchPosts();
    }, [timeFilter]); // timeFilter가 변경될 때마다 재호출

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/community?time=${timeFilter}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError('Failed to load posts');
            console.error('Error fetching posts:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async (postId: string) => {
        if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/community/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            // 삭제 후 목록 새로고침
            fetchPosts();
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('게시글 삭제에 실패했습니다.');
        }
    }

    const filteredPosts = posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading posts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시글 관리</h1>
                <Link
                    href="/admin/posts/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    새 게시글
                </Link>
            </div>

            {/* 검색 및 필터 */}
            <div className="flex gap-4 p-4 bg-white rounded shadow">
                <input
                    type="text"
                    placeholder="게시글 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded"
                />
                <select
                    className="px-4 py-2 border rounded"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                >
                    <option value="all">전체 기간</option>
                    <option value="week">1주일</option>
                    <option value="month">1개월</option>
                    <option value="year">1년</option>
                </select>
            </div>

            {/* 게시글 목록 테이블 */}
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">작성자</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">내용</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">작성일</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">좋아요</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">이미지</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">관리</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                        <tr key={post.post_id}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{post.author.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Link href={`/admin/posts/${post.id}`}>
                                    <div className="max-w-md truncate hover:text-blue-500">
                                        {post.content}
                                    </div>
                                </Link>
                            </td>
                            <td className="px-6 py-4">{post.createdAt}</td>
                            <td className="px-6 py-4">{post.vote_count}</td>
                            <td className="px-6 py-4">
                                {post.images.length > 0 && (
                                    <div className="flex gap-1">
                                        {post.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`게시글 이미지 ${index + 1}`}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/posts/${post.id}/edit`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        수정
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.post_id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 - 실제 구현 필요 */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    이전
                </button>
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg 
                ${currentPage === i + 1
                            ? 'bg-purple-600 text-white'
                            : 'border hover:bg-gray-50'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    )
}