'use client';

import {Video} from "@/types/video";

interface FeaturedVideosProps {
    title: string;
    videos: Video[];
}

export const FeaturedVideos = ({ title, videos }: FeaturedVideosProps) => {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {videos.map((video) => (
                    <div key={video.video_id} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                        <div className="w-48 h-32 flex-shrink-0">
                            <img
                                src={video.thumbnail_urls.medium}
                                alt={video.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex-1">
                            <h3 className="font-medium mb-2 line-clamp-2">{video.title}</h3>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{video.description}</p>
                            <div className="text-sm text-gray-500">
                                조회수 {video.statistics.viewCount.toLocaleString()}회
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};