'use client';

import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types/post';

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                    {post.author.avatar ? (
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}
                </div>
                <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                        >
              #{tag}
            </span>
                    ))}
                </div>
            )}

            <div className="flex items-center space-x-4 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-purple-600">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-purple-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                </button>
            </div>
        </div>
    );
};