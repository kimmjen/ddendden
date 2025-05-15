import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';

interface Post {
  id: number;
  post_id?: number;
  is_pinned?: boolean;
  createdAt: string;
  likes: number;
  tags?: string[];
  [key: string]: any;
}

export async function GET(request: NextRequest) {
    try {
        // 요청 URL에서 쿼리 파라미터 추출
        const { searchParams } = new URL(request.url);
        const time = searchParams.get('time') || 'all';
        const tag = searchParams.get('tag') || null;
        const sort = searchParams.get('sort') || 'recent'; // recent 또는 popular
        const page = parseInt(searchParams.get('page') ?? '1', 10);
        const limit = parseInt(searchParams.get('limit') ?? '5', 10);

        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'posts.json');

        // 파일 읽기 및 JSON 파싱
        const fileContents = await fs.readFile(filePath, 'utf8');
        let data: Post[] = JSON.parse(fileContents);

        // 데이터가 배열인지 확인
        if (!Array.isArray(data)) {
            console.warn('데이터가 배열 형식이 아닙니다:', data);
            return NextResponse.json({ data: [], total_pages: 0, total_items: 0 }, { status: 200 });
        }

        // 고정된 게시글을 맨 앞으로 정렬
        data.sort((a: Post, b: Post) => {
            // 고정된 게시글은 항상 최상단에 표시
            if (a.is_pinned && !b.is_pinned) return -1;
            if (!a.is_pinned && b.is_pinned) return 1;
            
            // 고정된 게시글이 아니면 시간순 정렬
            if (sort === 'recent') {
                return dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
            } else {
                // 인기순 정렬 (좋아요 수 기준)
                return b.likes - a.likes;
            }
        });

        // 필터링: time (예: all, week, month, year)
        if (time !== 'all') {
            const now = dayjs();
            data = data.filter((post: Post) => {
                // 고정된 게시글은 항상 포함
                if (post.is_pinned) return true;
                
                const postDate = dayjs(post.createdAt);

                switch (time) {
                    case 'day':
                        return postDate.isAfter(now.subtract(1, 'day'));
                    case 'week':
                        return postDate.isAfter(now.subtract(7, 'day'));
                    case 'month':
                        return postDate.isAfter(now.subtract(1, 'month'));
                    case 'year':
                        return postDate.isAfter(now.subtract(1, 'year'));
                    default:
                        return true;
                }
            });
        }

        // 태그로 필터링
        if (tag) {
            data = data.filter((post: Post) => {
                // 고정된 게시글은 항상 포함
                if (post.is_pinned) return true;
                
                return post.tags && post.tags.includes(tag);
            });
        }

        // 페이지네이션
        const total = data.length;
        const totalPages = Math.ceil(total / limit);
        const start = (page - 1) * limit;
        const paginatedData = data.slice(start, start + limit);

        // 결과 반환
        return NextResponse.json(
            {
                data: paginatedData,
                total_pages: totalPages,
                total_items: total,
                current_page: page
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error while fetching posts:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // 요청 본문 파싱
        const body = await request.json();
        
        // 필수 필드 검증
        if (!body.author || !body.content) {
            return NextResponse.json(
                { error: 'Missing required fields: author and content are required' },
                { status: 400 }
            );
        }

        // 데이터 파일 경로 설정
        const jsonDirectory = path.join(process.cwd(), 'data');
        const filePath = path.join(jsonDirectory, 'posts.json');

        // 파일 읽기 및 JSON 파싱
        const fileContents = await fs.readFile(filePath, 'utf8');
        let posts: Post[] = JSON.parse(fileContents);

        // 데이터가 배열인지 확인
        if (!Array.isArray(posts)) {
            console.warn('데이터가 배열 형식이 아닙니다:', posts);
            posts = [];
        }

        // 새 게시글 ID 생성 (최대 ID + 1)
        const maxId = Math.max(...posts.map((post: Post) => post.id), 0);
        const maxPostId = Math.max(...posts.map((post: Post) => post.post_id || 0), 1000);

        // 새 게시글 객체 생성
        const newPost: Post = {
            id: maxId + 1,
            post_id: maxPostId + 1,
            author: body.author,
            title: body.title || '',
            content: body.content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 0,
            comments: 0,
            tags: body.tags || [],
            vote_count: "0",
            images: body.images || [],
            poll_data: body.poll_data || null,
            is_pinned: false
        };

        // 새 게시글 추가
        posts.unshift(newPost);

        // 파일에 저장
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');

        return NextResponse.json(
            { message: 'Post created successfully', post: newPost },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error while creating post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}