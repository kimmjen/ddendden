'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Edit2, ArrowLeft, Loader2 } from 'lucide-react';

interface PollData {
    total_votes: string;
    choices: { text: string; vote_percentage: string }[];
}

interface Post {
    post_id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    createdAt: string;
    vote_count: string;
    images: string[];
    poll_data: PollData | null;
    id: number;
}

export default function PostDetailPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/community/${params.id}`);
                if (!response.ok) throw new Error('Failed to fetch the post');
                const data: Post = await response.json();
                setPost(data);
            } catch (err) {
                setError('게시글을 불러오는 데 실패했습니다.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchPost();
    }, [params.id]);

    const handleLike = () => setLiked(!liked);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
    };

    const renderPoll = (pollData: PollData) => (
        <div className="bg-gray-50 rounded-lg p-6 my-6">
            <h3 className="font-medium text-gray-900 mb-4">투표</h3>
            <div className="space-y-3">
                {pollData.choices.map((choice, index) => (
                    <div key={index} className="relative">
                        <div className="bg-blue-100 rounded-lg h-12 relative overflow-hidden">
                            <div
                                className="bg-blue-500 h-full absolute"
                                style={{ width: choice.vote_percentage }}
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <span className="text-gray-900 font-medium z-10">{choice.text}</span>
                                <span className="text-gray-700 font-medium z-10">{choice.vote_percentage}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">총 {pollData.total_votes}명 참여</p>
        </div>
    );

    if (loading) {
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
                <Link href="/admin/posts" className="text-blue-500 hover:underline">
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
                <Link href="/admin/posts" className="text-blue-500 hover:underline">
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/admin/posts"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>목록으로</span>
                    </Link>
                    <Link
                        href={`/admin/posts/${params.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Edit2 className="h-4 w-4" />
                        <span>수정</span>
                    </Link>
                </div>

                <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                        <header className="flex items-center gap-4 mb-6 pb-6 border-b">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-12 h-12 rounded-full ring-2 ring-gray-100"
                            />
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900">{post.author.name}</h2>
                                <time className="text-sm text-gray-500">{post.createdAt}</time>
                            </div>
                        </header>

                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </p>
                        </div>

                        {post.poll_data && renderPoll(post.poll_data)}

                        {post.images.length > 0 && (
                            <div className="space-y-4 mb-8">
                                <h3 className="font-medium text-gray-900">첨부된 이미지</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {post.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setImageModalUrl(image)}
                                            className="relative group aspect-video rounded-lg overflow-hidden bg-gray-100"
                                        >
                                            <img
                                                src={image}
                                                alt={`이미지 ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <footer className="flex items-center justify-between pt-6 border-t">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 transition-colors ${
                                        liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                    }`}
                                >
                                    <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                                    <span>{post.vote_count}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="h-5 w-5" />
                                    <span>댓글</span>
                                </button>
                            </div>
                            <button
                                onClick={handleShare}
                                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                        </footer>
                    </div>
                </article>
            </div>

            {imageModalUrl && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setImageModalUrl(null)}
                >
                    <img
                        src={imageModalUrl}
                        alt="확대된 이미지"
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                    />
                </div>
            )}
        </div>
    );
}