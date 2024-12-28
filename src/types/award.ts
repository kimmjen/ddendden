// types/award.ts

// 후보자 타입
interface Nominee {
    name: string;
    works: string[];
}

// 투표 정보 타입
interface VoteInfo {
    count?: number;
    percentage?: number;
}

// 통계 정보 타입
interface Stats {
    views?: number;
}

// 멤버 정보 타입
interface Member {
    name: string;
    role?: string;
}

// 수상자 타입
interface Winner {
    name?: string;
    work?: string;
    works?: string[];
    members?: Member[];
    description?: string;
    prize?: string;
    votes?: VoteInfo;
    stats?: Stats;
    nicknames?: string[];
    specialNote?: string;
    rank?: number;
}

// 상 타입
interface Award {
    id: number;
    title: string;
    englishTitle: string;
    type: 'single' | 'multiple' | 'special';
    nominees?: Nominee[];
    winner?: Winner;
    winners?: Winner[];
    votingMethod?: string;
    prize?: string;
    note?: string;
    image: string;
    sponsor?: string;
    totalVotes?: number;
    isDedicatedToFans?: boolean;
    presentationTiming?: string;
}

export type { Award, Nominee, Winner, Member, VoteInfo, Stats };