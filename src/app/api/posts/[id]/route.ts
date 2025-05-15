import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: number;
  post_id?: number;
  [key: string]: any;
}

// GET: 특정 ID의 게시글 조회
export async function GET(
    request: NextRequest
) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const idSegment = pathSegments[pathSegments.length - 1]; // posts/[id]에서 [id] 부분 추출
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

        // 데이터가 배열인지 확인
        if (!Array.isArray(posts)) {
            console.warn('데이터가 배열 형식이 아닙니다:', posts);
            return NextResponse.json(
                { error: '데이터가 배열 형식이 아닙니다.' },
                { status: 500 }
            );
        }

        // 특정 id의 게시글 검색
        const post = posts.find((item: Post) => item.id === id || item.post_id === id);
        
        if (!post) {
            return NextResponse.json(
                { error: '해당 게시글을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error while fetching post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// PUT: 게시글 수정
export async function PUT(
    request: NextRequest
) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const idSegment = pathSegments[pathSegments.length - 1]; // posts/[id]에서 [id] 부분 추출
        const id = parseInt(idSegment, 10);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: '유효하지 않은 게시글 ID입니다.' },
                { status: 400 }
            );
        }

        // 요청 본문 파싱
        const updates = await request.json();

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

        // 게시글 업데이트 (특정 필드만 업데이트 허용)
        const updatedPost = {
            ...posts[postIndex],
            title: updates.title !== undefined ? updates.title : posts[postIndex].title,
            content: updates.content !== undefined ? updates.content : posts[postIndex].content,
            tags: updates.tags !== undefined ? updates.tags : posts[postIndex].tags,
            images: updates.images !== undefined ? updates.images : posts[postIndex].images,
            poll_data: updates.poll_data !== undefined ? updates.poll_data : posts[postIndex].poll_data,
            updatedAt: new Date().toISOString(),
        };

        // 저장
        posts[postIndex] = updatedPost;
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Error while updating post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// DELETE: 게시글 삭제
export async function DELETE(
    request: NextRequest
) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const idSegment = pathSegments[pathSegments.length - 1]; // posts/[id]에서 [id] 부분 추출
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
        let posts: Post[] = JSON.parse(fileContents);

        // 특정 id의 게시글 검색
        const postIndex = posts.findIndex((item: Post) => item.id === id || item.post_id === id);
        
        if (postIndex === -1) {
            return NextResponse.json(
                { error: '해당 게시글을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // 게시글 삭제
        posts.splice(postIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        return NextResponse.json(
            { message: '게시글이 성공적으로 삭제되었습니다.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error while deleting post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}