import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // episodes.json 파일 읽기
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/cast.json', 'utf8');
        const episodes = JSON.parse(fileContents);

        // URL 쿼리 파라미터 파싱
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type'); // 'stats' 또는 'list'

        // 모든 게스트 목록 추출 (중복 제거)
        const uniqueGuests = [...new Set(
            episodes.flatMap((episode: { guests: any; }) => episode.guests)
        )].sort();

        // type이 'list'인 경우 단순 목록만 반환
        if (type === 'list') {
            return NextResponse.json({
                totalGuests: uniqueGuests.length,
                guests: uniqueGuests
            });
        }

        // 기본값 또는 type이 'stats'인 경우 통계 데이터 반환
        const guestStats = episodes.reduce((acc: Record<string, any>, episode: any) => {
            episode.guests.forEach((guest: string) => {
                if (!acc[guest]) {
                    acc[guest] = {
                        name: guest,
                        appearances: 0,
                        firstEpisode: episode.episodeNumber,
                        lastEpisode: episode.episodeNumber
                    };
                }
                acc[guest].appearances += 1;

                const currentEpNum = parseInt(episode.episodeNumber.replace('EP.', ''));
                const firstEpNum = parseInt(acc[guest].firstEpisode.replace('EP.', ''));
                if (currentEpNum < firstEpNum) {
                    acc[guest].firstEpisode = episode.episodeNumber;
                }

                const lastEpNum = parseInt(acc[guest].lastEpisode.replace('EP.', ''));
                if (currentEpNum > lastEpNum) {
                    acc[guest].lastEpisode = episode.episodeNumber;
                }
            });
            return acc;
        }, {});

        const sortedGuestStats = Object.values(guestStats)
            .sort((a: any, b: any) => b.appearances - a.appearances);

        return NextResponse.json({
            totalGuests: sortedGuestStats.length,
            guests: sortedGuestStats
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    // ... POST 메서드 코드는 동일하게 유지
}