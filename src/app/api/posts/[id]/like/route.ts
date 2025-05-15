import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: number;
  post_id?: number;
  likes: number;
  vote_count: string;
  [key: string]: any;
}

// POST: 게시글 좋아요 추가
export async function POST(
    request: NextRequest
) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const idSegment = pathSegments[pathSegments.length - 2]; // posts/[id]/like에서 [id] 부분 추출
        const id = parseInt(idSegment, 10);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: '유효하지 않은 게시글 ID입니다.' },
                { status: 400 }
            );
        }

        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'posts.json');

        // 파일 읽기 및 JSON 파싱
        const fileContents = await fs.readFile(filePath, 'utf8');
        const posts: Post[] = JSON.parse(fileContents);

        // 특정 id의 게시글 검색
        const postIndex = posts.findIndex((item: Post) => item.id === id || item.post_id === id);
        
        if (postIndex === -1) {
            return NextResponse.json(
                { error: '해당 게시글을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // 좋아요 증가
        posts[postIndex].likes += 1;
        posts[postIndex].vote_count = String(posts[postIndex].likes);

        // 저장
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        return NextResponse.json(
            { 
                message: '좋아요가 추가되었습니다.', 
                likes: posts[postIndex].likes,
                vote_count: posts[postIndex].vote_count
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error while liking post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// DELETE: 게시글 좋아요 취소
export async function DELETE(
    request: NextRequest
) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const idSegment = pathSegments[pathSegments.length - 2]; // posts/[id]/like에서 [id] 부분 추출
        const id = parseInt(idSegment, 10);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: '유효하지 않은 게시글 ID입니다.' },
                { status: 400 }
            );
        }

        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'posts.json');

        // 파일 읽기 및 JSON 파싱
        const fileContents = await fs.readFile(filePath, 'utf8');
        const posts: Post[] = JSON.parse(fileContents);

        // 특정 id의 게시글 검색
        const postIndex = posts.findIndex((item: Post) => item.id === id || item.post_id === id);
        
        if (postIndex === -1) {
            return NextResponse.json(
                { error: '해당 게시글을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // 좋아요 감소 (0 미만으로 내려가지 않도록)
        if (posts[postIndex].likes > 0) {
            posts[postIndex].likes -= 1;
            posts[postIndex].vote_count = String(posts[postIndex].likes);
        }

        // 저장
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        return NextResponse.json(
            { 
                message: '좋아요가 취소되었습니다.', 
                likes: posts[postIndex].likes,
                vote_count: posts[postIndex].vote_count
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error while unliking post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}