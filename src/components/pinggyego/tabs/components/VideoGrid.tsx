import {FC} from 'react';
import {VideoCard} from './VideoCard';
import {Video} from "@/types/video";
import {useTranslation} from "@/i18n/client";

interface VideoGridProps {
    videos: Video[];
    category: string;
}

export const VideoGrid: FC<VideoGridProps> = ({videos, category}) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t(`navigation.${category}`)}</h2>`
                <span className="text-gray-500 text-sm">
                총 {videos.length}개
            </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.video_id} video={video}/>
                ))}
            </div>
        </div>
    );
};