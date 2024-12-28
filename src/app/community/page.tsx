'use client';

import { useTranslation } from "@/i18n/client";
import { Post } from "@/types/post";
import Image from "next/image";
import {Heart, Loader2, MessageCircle, Share2} from "lucide-react";
import { useEffect, useState } from "react";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentDisplayProps {
    content: string;
}

// ContentDisplay 컴포넌트를 더 단순화
const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
    const formatContent = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div className="text-gray-800 leading-relaxed">
            {formatContent(content)}
        </div>
    );
};
interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative rounded-lg overflow-hidden mt-4">
            {/* Main Image */}
            <div className="relative h-auto">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                     bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                     bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function CommunityPage() {
    const { t } = useTranslation();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/community');
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

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500" />
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                {posts.map(post => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="p-6">
                            {/* Author Section */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-purple-100">
                                    {post.author.avatar ? (
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                                        {post.author.name}
                                    </p>
                                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-4 mb-6">
                                <ContentDisplay content={post.content} />

                                {/* Images Section */}
                                {post.images && post.images.length > 0 && (
                                    <ImageCarousel images={post.images} />
                                )}

                                {/* Poll Section */}
                                {post.poll_data && (
                                    <div className="mt-4 space-y-3 bg-purple-50 p-4 rounded-lg">
                                        {post.poll_data.choices.map((choice, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="flex-1">
                                                    <div className="relative h-10 bg-white rounded overflow-hidden">
                                                        <div
                                                            className="absolute h-full bg-purple-200"
                                                            style={{ width: choice.vote_percentage }}
                                                        />
                                                        <div className="relative z-10 px-3 py-2 text-sm">
                                                            {choice.text}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-purple-600">
                          {choice.vote_percentage}
                        </span>
                                            </div>
                                        ))}
                                        <p className="text-sm text-gray-500 mt-2">
                                            {post.poll_data.total_votes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Interaction Section */}
                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors group">
                                        <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">{post.vote_count}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors group">
                                        <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">댓글</span>
                                    </button>
                                </div>
                                <button className="text-gray-500 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-50">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}