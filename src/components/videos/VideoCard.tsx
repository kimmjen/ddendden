'use client';

import Image from 'next/image';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { formatViewCount, formatTimeAgo } from '@/lib/utils';
import {Video} from "@/types/video";

interface VideoCardProps {
    video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
    const handleClick = () => {
        window.open(`https://youtube.com/watch?v=${video.video_id}`, '_blank');
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer"
            onClick={handleClick}
        >
            <div className="aspect-video bg-gray-100 relative">
                <Image
                    src={video.thumbnail_urls.high}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                </div>
                <div
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all"/>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-lg mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <span>조회수 {formatViewCount(video.statistics.viewCount)}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(video.published_at)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="hover:text-pink-500 flex items-center space-x-1"
                                onClick={(e) => e.stopPropagation()}>
                            <Heart className="h-4 w-4"/>
                            <span>{formatViewCount(video.statistics.likeCount)}</span>
                        </button>
                        <button className="hover:text-pink-500 flex items-center space-x-1"
                                onClick={(e) => e.stopPropagation()}>
                            <MessageCircle className="h-4 w-4"/>
                            <span>{formatViewCount(video.statistics.commentCount)}</span>
                        </button>
                        <button className="hover:text-pink-500" onClick={(e) => e.stopPropagation()}>
                            <Share2 className="h-4 w-4"/>
                        </button>
                    </div>
                </div>
                {video.tags && video.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {video.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-yellow-100 text-gray-700 rounded-full text-xs hover:bg-yellow-200"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};