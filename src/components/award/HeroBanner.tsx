'use client';

import Image from 'next/image';
import {useState} from 'react';
import {Play, ArrowLeft} from 'lucide-react';

interface VideoStatistics {
    viewCount: number;
    likeCount: number;
    commentCount: number;
}

interface ThumbnailUrls {
    default: string;
    medium: string;
    high: string;
    standard: string;
    maxres: string;
}

interface Video {
    video_id: string;
    title: string;
    description: string;
    published_at: string;
    duration: string;
    duration_seconds: number;
    thumbnail_urls: ThumbnailUrls;
    tags: string[];
    statistics: VideoStatistics;
    video_type: string;
    url: string;
}

interface HeroBannerProps {
    video: Video;
}

export const HeroBanner = ({video}: HeroBannerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="w-full h-[70vh] relative">
            {!isPlaying ? (
                <>
                    <Image
                        src="/images/award1.webp"
                        alt="제1회 핑계고 시상식 배너"
                        fill
                        style={{objectFit: 'cover'}}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60"/>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <div className="text-center mb-8">
                            <h1 className="text-6xl font-bold mb-6">제1회 핑계고 시상식</h1>
                            <p className="text-2xl text-gray-300">2022.11 - 2023.11</p>
                        </div>
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
                        >
                            <Play className="group-hover:scale-110 transition-transform" size={24}/>
                            <span>영상 보기</span>
                            <span className="text-sm text-white/60">
                               {Math.floor(video.duration_seconds / 60)}분 {video.duration_seconds % 60}초
                           </span>
                        </button>
                    </div>
                </>
            ) : (
                <div className="relative w-full h-full">
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                    >
                        <ArrowLeft size={20}/>
                        <span>돌아가기</span>
                    </button>
                    <iframe
                        src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
                        title={video.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    );
};