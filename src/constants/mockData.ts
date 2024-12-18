import {Post} from "@/types/post";

export const MOCK_MEMBERS = [
    {
        rank: 1,
        name: "뜬뜬계원_1",
        points: 1234,
        avatar: "/images/avatar.webp"
    },
    {
        rank: 2,
        name: "뜬뜬계원_2",
        points: 1134,
        avatar: "/images/avatar.webp"
    },
    {
        rank: 3,
        name: "뜬뜬계원_3",
        points: 1034,
        avatar: "/images/avatar.webp"
    }
];

export const MOCK_TAGS = [
    {
        id: 1,
        name: "#핑계고",
        count: 128,
        isPopular: true
    },
    {
        id: 2,
        name: "#미니핑계",
        count: 85,
        isPopular: true
    },
    {
        id: 3,
        name: "#뜬뜬시상식",
        count: 42,
        isPopular: false
    },
    {
        id: 4,
        name: "#이달의계원",
        count: 36,
        isPopular: true
    }
];

export const MOCK_POSTS: Post[] = [
    {
        id: 1,
        post_id: 1,
        author: {
            name: '뜬뜬계원_1',
            avatar: '/images/avatar.webp'
        },
        content: '이번 핑계고 영상 진짜 유용했어요! 저도 그 앱 써봤는데 완전 좋네요 👍',
        createdAt: '2시간 전',
        likes: 42,
        comments: 12,
        tags: ['핑계고', '앱리뷰']
    },
    {
        id: 2,
        post_id: 2,
        author: {
            name: '뜬뜬계원_2',
            avatar: '/images/avatar.webp'
        },
        content: 'MINI 핑계 시리즈 너무 재밌어요~ 다음 편도 기대됩니다 😊',
        createdAt: '3시간 전',
        likes: 38,
        comments: 8,
        tags: ['MINI핑계']
    },
    {
        id: 3,
        post_id: 3,
        author: {
            name: '뜬뜬계원_3',
            avatar: '/images/avatar.webp'
        },
        content: '다음 시상식은 언제인가요? 기다리고 있어요!',
        createdAt: '5시간 전',
        likes: 27,
        comments: 15,
        tags: ['시상식']
    }
];

export const LATEST_VIDEOS = [
    {
        video_id: "video1",
        title: '[EN] 사탄 트럭버거 노여움 에쓰와카 실전 여행 START | 풍향고 EP.1 베트남 하노이',
        description: '노여움 에쓰와카와 함께하는 베트남 하노이 여행 1편',
        published_at: "2024-03-10T09:00:00Z",
        duration: '1:38:52',
        duration_seconds: 5932,
        thumbnail_urls: {
            default: '/thumbnails/video1_default.jpg',
            medium: '/thumbnails/video1_medium.jpg',
            high: '/thumbnails/video1_high.jpg',
            standard: '/thumbnails/video1_standard.jpg',
            maxres: '/thumbnails/video1_maxres.jpg',
        },
        tags: ['풍향고', '베트남', '하노이', '여행'],
        statistics: {
            viewCount: 88820,
            likeCount: 6200,
            commentCount: 1230
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video1',
        live_broadcast_content: 'none'
    },
    {
        video_id: "video2",
        title: '[EN] 샤브샤브 플렉스하러 왔다가 통수맞고 갑니다 | 풍향고 EP.2 베트남 하노이',
        description: '베트남 하노이 여행 2편 - 현지 맛집 탐방',
        published_at: "2024-03-07T10:00:00Z",
        duration: '1:42:15',
        duration_seconds: 6135,
        thumbnail_urls: {
            default: '/thumbnails/video2_default.jpg',
            medium: '/thumbnails/video2_medium.jpg',
            high: '/thumbnails/video2_high.jpg',
            standard: '/thumbnails/video2_standard.jpg',
            maxres: '/thumbnails/video2_maxres.jpg',
        },
        tags: ['풍향고', '베트남', '하노이', '맛집'],
        statistics: {
            viewCount: 75500,
            likeCount: 5800,
            commentCount: 980
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video2',
        live_broadcast_content: 'none'
    },
    {
        video_id: "video3",
        title: '[EN/JP] 동감하기는 뭔개고 | EP.58',
        description: '오늘도 즐거운 동감하기는 뭔개고!',
        published_at: "2024-03-05T11:00:00Z",
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
            viewCount: 54000,
            likeCount: 3800,
            commentCount: 670
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video3',
        live_broadcast_content: 'none'
    },
    {
        video_id: "video4",
        title: '[EN] 유튜버의 미니어처 챌린지 | MINI 핑계 EP.24',
        description: '유튜버들과 함께하는 미니어처 만들기 대결',
        published_at: "2024-03-03T14:00:00Z",
        duration: '42:18',
        duration_seconds: 2538,
        thumbnail_urls: {
            default: '/thumbnails/video4_default.jpg',
            medium: '/thumbnails/video4_medium.jpg',
            high: '/thumbnails/video4_high.jpg',
            standard: '/thumbnails/video4_standard.jpg',
            maxres: '/thumbnails/video4_maxres.jpg',
        },
        tags: ['MINI핑계', '미니어처', '챌린지'],
        statistics: {
            viewCount: 62300,
            likeCount: 4500,
            commentCount: 850
        },
        video_type: 'video',
        url: 'https://youtube.com/watch?v=video4',
        live_broadcast_content: 'none'
    }
];