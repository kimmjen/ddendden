'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';

interface Author {
    name: string;
    avatar: string;
}

interface Post {
    post_id: string;
    author: Author;
    content: string;
    createdAt: string;
    vote_count: string;
    images: string[];
    poll_data: any | null;
    id: number;
}

const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
            type="text"
            placeholder="게시글 또는 작성자 검색..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
    </div>
);

const TimeFilter = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-8 py-2 bg-white rounded-lg border border-gray-200 appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
            <option value="all">전체 기간</option>
            <option value="week">1주일</option>
            <option value="month">1개월</option>
            <option value="year">1년</option>
        </select>
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
    const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        if (totalPages <= 5) return i + 1;
        if (currentPage <= 3) return i + 1;
        if (currentPage >= totalPages - 2) return totalPages - 4 + i;
        return currentPage - 2 + i;
    });

    return (
        <div className="flex justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
            >
                이전
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
            >
                다음
            </button>
        </div>
    );
};

export default function PostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFilter, setTimeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        fetchPosts();
    }, [timeFilter, currentPage]);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/community?time=${timeFilter}&page=${currentPage}&limit=${postsPerPage}`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const { data, total_pages } = await response.json();
            setPosts(data || []);
            setTotalPages(total_pages || 1);
        } catch (err) {
            setError('게시글을 불러오는데 실패했습니다');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (postId: string) => {
        if (!confirm('이 게시글을 삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/community/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete post');
            setPosts(prev => prev.filter(post => post.post_id !== postId));
        } catch (err) {
            console.error('Error:', err);
            alert('삭제 실패');
        }
    };

    const filteredPosts = posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">{error}</p>
                <button onClick={fetchPosts} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="max-w mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">게시글 관리</h1>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <Plus className="h-5 w-5" />
                    새 게시글
                </Link>
            </div>

            <div className="flex gap-4">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <TimeFilter value={timeFilter} onChange={setTimeFilter} />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
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
                        {filteredPosts.map(post => (
                            <tr key={post.post_id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="font-medium">{post.author.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/posts/${post.id}`}>
                                        <div className="max-w-md truncate hover:text-blue-500">
                                            {post.content}
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{post.createdAt}</td>
                                <td className="px-6 py-4">{post.vote_count}</td>
                                <td className="px-6 py-4">
                                    {post.images.length > 0 && (
                                        <div className="flex gap-2">
                                            {post.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`이미지 ${index + 1}`}
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.post_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}