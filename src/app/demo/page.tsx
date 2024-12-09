// src/app/page.tsx
import {VideoCard} from '@/components/videos/VideoCard';
import {VideoSection} from "@/components/sections/VideoSection";
import {
    MessageCircle,
    Heart,
    Share2,
    Trophy,
    Crown,
    Smartphone,
    Gift,
    Menu
} from 'lucide-react';
import {ContactSection} from "@/components/sections/ContactSection";
import {Banner} from "@/components/layout/Banner";
import {CategorySection} from "@/components/sections/CategorySection";
import {ChannelStats} from "@/components/sections/ChannelStats";
import {FeaturedVideos} from "@/components/sections/FeaturedVideos";
import {FAQ} from "@/components/sections/FAQ";
import {ScheduleCalendar} from "@/components/sections/Calendar";
import {LiveChat} from "@/components/sections/LiveChat";
import {MonthlyMembers} from "@/components/sections/SideSection/MonthlyMembers";
import {PopularTags} from "@/components/sections/SideSection/PopularTags";
import {CommunitySection} from "@/components/sections/CommunitySection";
import {LATEST_VIDEOS, MOCK_MEMBERS, MOCK_POSTS, MOCK_TAGS} from "@/constants/mockData";
import {Video} from "@/types/video";
import {ImageBanner} from "@/components/layout/ImageBanner";

const MOCK_VIDEOS: Video[] = [
    {
        video_id: "video1",
        title: '바람따라가는 여행 - 풍향고 EP.2',
        description: '바람따라 떠나는 여행, 이번에는 어디로?',
        published_at: "2024-03-02T09:00:00Z",
        duration: '1:50:37',
        duration_seconds: 6637,
        thumbnail_urls: {
            default: '/thumbnails/video1_default.jpg',
            medium: '/thumbnails/video1_medium.jpg',
            high: '/thumbnails/video1_high.jpg',
            standard: '/thumbnails/video1_standard.jpg',
            maxres: '/thumbnails/video1_maxres.jpg',
        },
        tags: ['풍향고', '여행', '바람따라'],
        statistics: {
            viewCount: 5950,
            likeCount: 450,
            commentCount: 85
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video1',
        live_broadcast_content: 'none'
    },
    {
        video_id: "video2",
        title: '노여움 에쓰와카 실전 여행 START - EP.1',
        description: '에쓰와카와 함께하는 특별한 여행',
        published_at: "2024-02-25T10:00:00Z",
        duration: '1:38:52',
        duration_seconds: 5932,
        thumbnail_urls: {
            default: '/thumbnails/video2_default.jpg',
            medium: '/thumbnails/video2_medium.jpg',
            high: '/thumbnails/video2_high.jpg',
            standard: '/thumbnails/video2_standard.jpg',
            maxres: '/thumbnails/video2_maxres.jpg',
        },
        tags: ['에쓰와카', '여행', '노여움'],
        statistics: {
            viewCount: 8820,
            likeCount: 620,
            commentCount: 123
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video2',
        live_broadcast_content: 'none'
    },
    {
        video_id: "video3",
        title: '동감하기는 뭔개고 - EP.58',
        description: '오늘도 즐거운 동감하기는 뭔개고!',
        published_at: "2024-02-10T11:00:00Z",
        duration: '1:10:04',
        duration_seconds: 4204,
        thumbnail_urls: {
            default: '/thumbnails/video3_default.jpg',
            medium: '/thumbnails/video3_medium.jpg',
            high: '/thumbnails/video3_high.jpg',
            standard: '/thumbnails/video3_standard.jpg',
            maxres: '/thumbnails/video3_maxres.jpg',
        },
        tags: ['동감', '뭔개고', '일상'],
        statistics: {
            viewCount: 5400,
            likeCount: 380,
            commentCount: 67
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video3',
        live_broadcast_content: 'none'
    }
];


// const POPULAR_SERIES: Series[] = [
//     {title: '바람따라가는 여행 - 풍향고', ranking: 1},
//     {title: 'MINI 핑계', ranking: 2},
//     {title: '동감하기는 뭔개고', ranking: 3}
// ];

export default function DemoHome() {
    return (
        <div className="w-full overflow-hidden">
            {/*<Banner />*/}
            <ImageBanner />
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/*<CategorySection />*/}
                {/*<ChannelStats />*/}

                <VideoSection videos={MOCK_VIDEOS} />
                {/* 두 열 레이아웃 */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                    {/* 메인 콘텐츠 */}
                    <div>
                        {/*<FeaturedVideos title="최신 업로드" videos={LATEST_VIDEOS} />*/}
                        <CommunitySection posts={MOCK_POSTS} />
                        {/*<FAQ />*/}
                    </div>

                    {/* 사이드바 */}
                    <div className="space-y-6">
                        <ScheduleCalendar />
                        <LiveChat />
                        <MonthlyMembers members={MOCK_MEMBERS} />
                        <PopularTags tags={MOCK_TAGS} />
                    </div>
                </div>

                {/* 하단 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/*<ContactSection />*/}
                </div>
            </div>
        </div>
    );
}