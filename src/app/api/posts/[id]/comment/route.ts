import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: number;
  post_id?: number;
  comments: number;
  [key: string]: any;
}

// GET: 특정 게시글의 댓글 조회
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: '유효하지 않은 게시글 ID입니다.' },
                { status: 400 }
            );
        }

        // TODO: 추후에 comments.json 파일을 만들어서 관리할 예정
        // 현재는 예시 응답 반환
        const exampleComments = [
            {
                id: 1,
                post_id: id,
                author: {
                    id: 101,
                    name: "뜬뜬계원_1",
                    avatar: "/images/avatar.webp"
                },
                content: "정말 좋은 글이네요!",
                createdAt: "2024-04-05T10:30:00Z",
                likes: 5
            },
            {
                id: 2,
                post_id: id,
                author: {
                    id: 102,
                    name: "뜬뜬계원_2",
                    avatar: "/images/avatar.webp"
                },
                content: "저도 같은 생각이에요~",
                createdAt: "2024-04-05T11:15:00Z",
                likes: 3
            }
        ];

        return NextResponse.json({
            data: exampleComments,
            total: exampleComments.length
        }, { status: 200 });
    } catch (error) {
        console.error('Error while fetching comments:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST: 특정 게시글에 댓글 추가
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        
        if (isNaN(id)) {
            return NextResponse.json(
                { error: '유효하지 않은 게시글 ID입니다.' },
                { status: 400 }
            );
        }

        // 요청 본문 파싱
        const body = await request.json();
        
        if (!body.author || !body.content) {
            return NextResponse.json(
                { error: '필수 필드가 누락되었습니다: author와 content는 필수입니다.' },
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

        // 댓글 수 증가
        posts[postIndex].comments += 1;

        // 저장
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        // TODO: 추후에 comments.json 파일을 만들어서 댓글 저장 구현

        // 새 댓글 객체 (예시)
        const newComment = {
            id: Date.now(), // 임시 ID
            post_id: id,
            author: body.author,
            content: body.content,
            createdAt: new Date().toISOString(),
            likes: 0
        };

        return NextResponse.json(
            { 
                message: '댓글이 추가되었습니다.', 
                comment: newComment,
                comment_count: posts[postIndex].comments
            }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Error while adding comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}