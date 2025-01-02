import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'youtube_community.json');

        // 파일 읽기
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);

        // 데이터가 배열인지 확인
        if (!Array.isArray(data)) {
            console.warn('데이터가 배열 형식이 아닙니다:', data);
            return NextResponse.json({ error: '데이터가 배열 형식이 아닙니다.' }, { status: 500 });
        }
        // 특정 id의 게시글 검색
        const post = data.find((item: any) =>
            item.id === parseInt(id)
        );
        if (!post) {
            console.warn('해당 게시글을 찾을 수 없습니다:', id);
            return NextResponse.json(
                { error: '해당 게시글을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        console.log(`GET 성공: 게시글 ${id} 반환`);
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        // @ts-ignore
        console.error('Error while fetching post:', error.message);
        return NextResponse.json(
            // @ts-ignore
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
