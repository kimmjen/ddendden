export interface Series {
    id: number;
    title: string;          // 시리즈 제목
    subTitle?: string;          // 시리즈 제목
    thumbnail_urls: string;
    englishTitle: string;   // 영문 제목
    startDate: string;      // 시작일
    endDate?: string;       // 종료일 (있는 경우)
    isOngoing: boolean;     // 진행 중 여부
    schedule: string;       // 방영 일정
    production: string;     // 제작사
    staff: {
        directors: string[];  // 연출진
        writers: string[];    // 작가진
    };
    cast: string[];         // 출연진
    genre: string[];          // 장르
    platform: string;       // 플랫폼
    fandom: string;         // 팬덤명
}