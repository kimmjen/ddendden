import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function GET(request: Request) {
    try {
        // 요청 URL에서 쿼리 파라미터 추출
        const { searchParams } = new URL(request.url);
        const time = searchParams.get('time') || 'all';
        const page = parseInt(searchParams.get('page') ?? '1', 10);
        const limit = parseInt(searchParams.get('limit') ?? '10', 10);

        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'youtube_community.json');

        // 파일 읽기 및 JSON 파싱
        const fileContents = await fs.readFile(filePath, 'utf8');
        let data = JSON.parse(fileContents);

        // 데이터가 배열인지 확인
        if (!Array.isArray(data)) {
            console.warn('데이터가 배열 형식이 아닙니다:', data);
            return NextResponse.json([], { status: 200 });
        }

        // 필터링: time (예: all, week, month, year)
        if (time !== 'all') {
            const now = dayjs(); // 현재 시간
            data = data.filter(post => {
                const postDate = dayjs(post.createdAt); // 게시글 날짜를 dayjs 객체로 변환

                switch (time) {
                    case 'week':
                        return postDate.isAfter(now.subtract(7, 'day')); // 최근 7일 이내
                    case 'month':
                        return postDate.isAfter(now.subtract(1, 'month')); // 최근 1개월 이내
                    case 'year':
                        return postDate.isAfter(now.subtract(1, 'year')); // 최근 1년 이내
                    default:
                        return true;
                }
            });
        }


        // 페이지네이션
        const total = data.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const paginatedData = data.slice(start, start + limit);

        console.log(
            `GET 성공: ${total}개의 포스트 중 ${paginatedData.length}개를 반환 (페이지 ${page}/${totalPages})`
        );

        // 결과 반환
        return NextResponse.json(
            {
                data: paginatedData,
                total_pages: totalPages,
                total_items: total,
            },
            { status: 200 }
        );
    } catch (error) {
        // @ts-ignore
        console.error('Error while fetching data:', error.message);
        return NextResponse.json(
            // @ts-ignore
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
