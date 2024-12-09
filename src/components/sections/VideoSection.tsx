'use client';

import { VideoCard } from '@/components/videos/VideoCard';
import {Video} from "@/types/video";

interface VideoSectionProps {
    videos: Video[];
}

export const VideoSection = ({ videos }: VideoSectionProps) => {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">핑계고 시리즈</h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-pink-50">
                        최신순
                    </button>
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium">
                        인기순
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard
                        key={video.video_id}
                        video={video}
                    />
                ))}
            </div>
        </div>
    );
};