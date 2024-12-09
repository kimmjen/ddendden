export type VideoCategory = 'pinggyego' | 'mini-pinggyego' | 'pinggyego-live';


export interface Video {
    video_id: string;
    title: string;
    description: string;
    published_at: string;
    duration: string;
    duration_seconds: number;
    thumbnail_urls: {
        default: string;
        medium: string;
        high: string;
        standard: string;
        maxres: string;
    }
    tags: string[];
    statistics: {
        viewCount: number;
        likeCount: number;
        commentCount: number;
    }
    video_type: string;
    url: string;
    live_broadcast_content: string
}

export interface ProcessedVideo extends Omit<Video, 'thumbnail_urls'> {
    thumbnail: {
        default: string;
        medium: string;
        high: string;
        standard: string;
        maxres: string;
    }
}