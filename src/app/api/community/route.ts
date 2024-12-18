import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 데이터 파일 읽기
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/youtube_community.json', 'utf8');
        const data = JSON.parse(fileContents);

        // 데이터가 배열이 아닌 경우 빈 배열 반환
        if (!Array.isArray(data)) {
            console.warn('데이터가 배열 형식이 아닙니다:', data);
            return NextResponse.json([]);
        }

        console.log('GET 성공:', data.length + '개의 포스트');
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json([], { status: 500 });
    }
}