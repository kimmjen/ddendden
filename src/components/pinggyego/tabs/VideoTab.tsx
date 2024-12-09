import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { VideoGrid } from './components/VideoGrid';
import { Sidebar } from './components/Sidebar';
import {VideoCategory} from "@/types/video";
import {filterAndSortVideos} from "@/utils/videoUtils";
import {useVideos} from "@/hooks/useVideos";

export const VideoTab = () => {
    const { videos, isLoading, error } = useVideos();
    const [currentCategory, setCurrentCategory] = useState<VideoCategory>('pinggyego');
    const [sortBy, setSortBy] = useState('latest');
    const [period, setPeriod] = useState('all');

    const processedVideos = useMemo(() => {
        return filterAndSortVideos(videos, currentCategory, sortBy, period);
    }, [videos, currentCategory, sortBy, period]);

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
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <Sidebar
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                period={period}
                setPeriod={setPeriod}
            />
            <VideoGrid
                videos={processedVideos}
                category={currentCategory}
            />
        </div>
    );
};