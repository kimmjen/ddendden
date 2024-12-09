import {ProcessedVideo, Video, VideoCategory} from "@/types/video";

export const processVideoData = (videos: Video[]): ProcessedVideo[] => {
    return videos.map(video => ({
        ...video,
        thumbnail: video.thumbnail_urls,
        title: video.title.replace('[EN] ', '').replace('ㅣ', '-'),
    }));
};

export const filterAndSortVideos = (
    videos: Video[],
    category: VideoCategory,
    sortBy: string,
    period: string
): Video[] => {
    const now = new Date();

    return videos
        .filter(video => {
            if (video.video_type !== category) return false;

            const videoDate = new Date(video.published_at);
            if (period === 'month') {
                return videoDate.getMonth() === now.getMonth() &&
                    videoDate.getFullYear() === now.getFullYear();
            }
            if (period === 'year') {
                return videoDate.getFullYear() === now.getFullYear();
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.statistics.likeCount - a.statistics.likeCount;
                case 'views':
                    return b.statistics.viewCount - a.statistics.viewCount;
                default:
                    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
            }
        });
};