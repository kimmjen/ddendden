import { FC } from 'react';
import {ProcessedVideo, Video} from "@/types/video";
import {formatDate, formatNumber} from "@/utils/format";
import {useRouter} from "next/navigation";

interface VideoCardProps {
    video: Video;  // ProcessedVideo 대신 원본 Video 타입 사용
}

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
    const router = useRouter()
    const formattedTitle = video.title.replace('[EN] ', '').replace('ㅣ', '-');
    const thumbnailUrl = video.thumbnail_urls.maxres || video.thumbnail_urls.high;

    const handleClickVideo = (videoId: string) => {
        router.push(`/monthly/${videoId}`)
    }

    return (
        <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                 onClick={() => handleClickVideo(video.video_id)}>
            <div className="aspect-video bg-gray-100 relative">
                <img
                    src={thumbnailUrl}
                    alt={formattedTitle}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-sm rounded">
                    {video.duration}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2">{formattedTitle}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{video.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>조회수 {formatNumber(video.statistics.viewCount)}</span>
                    <time dateTime={video.published_at}>
                        {formatDate(video.published_at)}
                    </time>
                </div>
            </div>
        </article>
    );
};