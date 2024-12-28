import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// GET: 게스트 통계 조회
export async function GET() {
    try {
        // episodes.json 파일 읽기
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/cast.json', 'utf8');
        const episodes = JSON.parse(fileContents);

        // 게스트 통계 계산
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

                // 첫 출연 에피소드 업데이트 (더 이른 에피소드인 경우)
                const currentEpNum = parseInt(episode.episodeNumber.replace('EP.', ''));
                const firstEpNum = parseInt(acc[guest].firstEpisode.replace('EP.', ''));
                if (currentEpNum < firstEpNum) {
                    acc[guest].firstEpisode = episode.episodeNumber;
                }

                // 마지막 출연 에피소드 업데이트 (더 늦은 에피소드인 경우)
                const lastEpNum = parseInt(acc[guest].lastEpisode.replace('EP.', ''));
                if (currentEpNum > lastEpNum) {
                    acc[guest].lastEpisode = episode.episodeNumber;
                }
            });
            return acc;
        }, {});

        // 배열로 변환하고 출연 횟수로 정렬
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

// POST: 새로운 에피소드에 게스트 추가
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 필수 필드 검증
        if (!body.episodeNumber || !body.guests || !Array.isArray(body.guests)) {
            return NextResponse.json(
                { error: 'Missing required fields or invalid format' },
                { status: 400 }
            );
        }

        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/cast.json', 'utf8');
        let episodes = JSON.parse(fileContents);

        // 에피소드 찾기
        const episodeIndex = episodes.findIndex((ep: any) =>
            ep.episodeNumber === body.episodeNumber
        );

        if (episodeIndex === -1) {
            // 새 에피소드 생성
            const newEpisode = {
                date: body.date || new Date().toISOString().split('T')[0],
                year: body.year || new Date().getFullYear(),
                episodeNumber: body.episodeNumber,
                title: body.title || `${body.episodeNumber} 에피소드`,
                guests: body.guests,
                location: body.location || "",
                notes: body.notes || []
            };
            episodes.push(newEpisode);
        } else {
            // 기존 에피소드 게스트 업데이트
            episodes[episodeIndex].guests = [
                ...new Set([...episodes[episodeIndex].guests, ...body.guests])
            ];
        }

        // 파일 업데이트
        await fs.writeFile(
            jsonDirectory + '/episodes.json',
            JSON.stringify(episodes, null, 2)
        );

        // 업데이트된 게스트 통계 반환
        const updatedEpisode = episodeIndex === -1
            ? episodes[episodes.length - 1]
            : episodes[episodeIndex];

        return NextResponse.json({
            message: 'Guests added successfully',
            episode: updatedEpisode
        }, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// 게스트 데이터 사용 예시:
/*
// GET 요청
const response = await fetch('/api/guests');
const data = await response.json();

// POST 요청
const response = await fetch('/api/guests', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        episodeNumber: 'EP.63',
        guests: ['신규 게스트1', '신규 게스트2'],
        date: '2024-12-25',
        title: '새로운 에피소드',
        location: '안테나 플러스'
    })
});
const data = await response.json();
*/