'use client'

import Link from "next/link";
import {VideoDetail} from "@/types/video";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";

interface NavigationVideo {
    video_id: string,
    title: string,
    thumbnail_urls: {
        medium: string,
    }
}

function VideoNavigation({
    prev,
    next
                         }: {
    prev?: NavigationVideo;
    next?: NavigationVideo;
}) {
    return (
        <div className="grid grid-cols-2 gap-4 mt-8">
            {prev && (
                <Link href={`/monthly/${prev.video_id}`} className="group">
                    <div className="bg-white/5 rounded-lg p-4 h-full hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={prev.thumbnail_urls.medium}
                                    alt={prev.title}
                                    width={160}
                                    height={90}
                                    className="rounded"
                                />
                            </div>
                            <div>
                                <span className="text-sm text-gray-400">이전 동영상</span>
                                <h3 className="text-white line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                                    {prev.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {next && (
                <Link href={`/monthly/${next.video_id}`} className="group">
                    <div className="bg-white/5 rounded-lg p-4 h-full hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={next.thumbnail_urls.medium}
                                    alt={next.title}
                                    width={160}
                                    height={90}
                                    className="rounded"
                                />
                            </div>
                            <div>
                                <span className="text-sm text-gray-400">다음 동영상</span>
                                <h3 className="text-white line-clamp-2 group-hover:text-[#ff6b6b] transition-colors">
                                    {next.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}

interface VideoResponse {
    video: VideoDetail;
    prevVideo?: NavigationVideo;
    nextVideo?: NavigationVideo;
}

export default function VideoDetailPage() {
    const params = useParams();
    const videoId = params.videoId as string;
    const [videoData, setVideoData] = useState<VideoResponse | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log(videoId)
        fetch(`/api/videos/${videoId}`)
        .then(res => res.json())
        .then(data => {
            setVideoData(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching video', err);
            setLoading(false);
        })
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500" />
            </div>
        );
    }
    if (!videoData) return <div>Video not found</div>;

    const { video, prevVideo, nextVideo } = videoData;
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <div className="max-w-7xl mx-auto p-4">
                {/* 비디오 플레이어 */}
                <div className="aspect-video w-full mb-6">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                    />
                </div>

                {/* 비디오 정보 */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
                    <p className="text-gray-400">{video.description}</p>
                </div>
                <VideoNavigation
                    prev={prevVideo}
                    next={nextVideo}
                />
            </div>
        </div>
    );
}