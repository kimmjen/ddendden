import { useEffect, useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { VideoGrid } from './components/VideoGrid';
import { Sidebar } from './components/Sidebar';
import {Video, VideoCategory} from "@/types/video";
import {filterAndSortVideos} from "@/utils/videoUtils";
import {useVideos} from "@/hooks/useVideos";

export const VideoTab = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentCategory, setCurrentCategory] = useState('monthly');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/videos/monthly');
                if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다');
                const data = await response.json();
                setVideos(data);
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
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
            <div className="text-center py-8 text-gray-500">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-pink-500 hover:underline focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                >
                    다시 시도하기
                </button>
            </div>
        );
    }

    return (
        <div className="gap-8">
            <VideoGrid
                videos={videos}
                category={currentCategory}
            />
        </div>
    );
};