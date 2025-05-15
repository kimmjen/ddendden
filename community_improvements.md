# CommunitySection 컴포넌트 개선 계획

## 현재 상태

현재 `CommunitySection` 컴포넌트는 다음과 같은 한계가 있습니다:

1. **정적 목 데이터 사용**: 
   ```jsx
   <CommunitySection posts={MOCK_POSTS} />
   ```
   - 메인 페이지에서 정적 목 데이터(`MOCK_POSTS`)를 사용하고 있어 실제 동적 데이터와 연결되어 있지 않습니다.

2. **기능 제한**:
   - "글쓰기" 버튼이 주석 처리되어 있어 (`{/*글쓰기*/}`) 사용자 참여가 제한됨
   - 게시글과의 실질적 상호작용(댓글, 좋아요 등)이 구현되어 있지 않음

3. **API 통합 부재**:
   - 실제 `/api/community` 엔드포인트와 연결되어 있지 않음
   - 커뮤니티 API가 페이지네이션을 지원하지만 컴포넌트에서 활용하지 않음

4. **UI/UX 제한**:
   - 로딩 상태 표시 없음
   - 에러 처리 미흡
   - 반응형 디자인 최적화 부족

## 개선 계획

### 1. 실제 API 데이터 통합

```jsx
// 개선된 CommunitySection 컴포넌트
import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import { PostCard } from './PostCard';
import { ArrowRight, Loader2 } from "lucide-react";

export const CommunitySection = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/community?page=${page}&limit=3`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                
                const data = await response.json();
                
                setPosts(prev => page === 1 ? data.data : [...prev, ...data.data]);
                setHasMore(page < data.total_pages);
            } catch (error) {
                setError('커뮤니티 게시글을 불러오는데 실패했습니다.');
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    return (
        <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
                <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium gap-1">
                    글쓰기
                    <ArrowRight size={16} />
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            
            {loading && (
                <div className="flex justify-center py-4">
                    <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
                </div>
            )}
            
            {!loading && hasMore && (
                <div className="flex justify-center pt-4">
                    <button 
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                    >
                        더 보기
                    </button>
                </div>
            )}
        </div>
    );
};
```

### 2. PostCard 컴포넌트 개선

```jsx
// 개선된 PostCard 컴포넌트
import { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types/post';

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes || 0);
    
    const handleLike = () => {
        // 실제 구현에서는 API 호출을 추가
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 relative">
                    {post.author.avatar ? (
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200" />
                    )}
                </div>
                <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-sm hover:bg-purple-100 cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between text-gray-500 pt-4 border-t">
                <div className="flex items-center space-x-4">
                    <button 
                        className={`flex items-center space-x-1 hover:text-purple-600 transition-colors ${isLiked ? 'text-purple-600' : ''}`}
                        onClick={handleLike}
                    >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-purple-600' : ''}`} />
                        <span>{likeCount}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                    </button>
                </div>
                <button className="hover:text-purple-600 transition-colors p-1 rounded-full hover:bg-purple-50">
                    <Share2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
```

### 3. 게시글 작성 모달 구현

```jsx
// PostFormModal 컴포넌트
import { useState } from 'react';
import { X } from 'lucide-react';

interface PostFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PostFormModal = ({ isOpen, onClose }: PostFormModalProps) => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    if (!isOpen) return null;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!content.trim()) return;
        
        try {
            setIsSubmitting(true);
            // 실제 구현에서는 API 호출을 추가
            // await fetch('/api/community/create', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         content,
            //         tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            //     }),
            // });
            
            setContent('');
            setTags('');
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">새 게시글 작성</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            내용
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="게시글 내용을 입력하세요..."
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            태그 (쉼표로 구분)
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="예: 핑계고, 미니핑계, 뜬뜬시상식"
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 mr-2"
                            disabled={isSubmitting}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '게시 중...' : '게시하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
```

### 4. 메인 페이지 통합

```jsx
// 개선된 HomePage 컴포넌트
import { useState } from 'react';
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ScheduleCalendar } from "@/components/sections/Calendar";
import { MonthlyMembers } from "@/components/sections/SideSection/MonthlyMembers";
import { PopularTags } from "@/components/sections/SideSection/PopularTags";
import { ImageBanner } from "@/components/layout/ImageBanner";
import { SeriesSection } from "@/components/sections/SeriesSection";
import { SERIES_LIST } from "@/constants/seriesData";
import { PostFormModal } from "@/components/sections/CommunitySection/PostFormModal";
import { MOCK_MEMBERS, MOCK_TAGS } from "@/constants/mockData";

export default function Home() {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    
    const openPostModal = () => {
        setIsPostModalOpen(true);
    };
    
    return (
        <div className="w-full overflow-hidden">
            <ImageBanner />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <SeriesSection series={SERIES_LIST}/>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                    <div>
                        {/* API 연동된 CommunitySection은 목 데이터 불필요 */}
                        <CommunitySection onNewPost={openPostModal} />
                    </div>

                    <div className="space-y-6">
                        <ScheduleCalendar />
                        <MonthlyMembers members={MOCK_MEMBERS} />
                        <PopularTags tags={MOCK_TAGS} />
                    </div>
                </div>
            </div>
            
            <PostFormModal 
                isOpen={isPostModalOpen} 
                onClose={() => setIsPostModalOpen(false)} 
            />
        </div>
    );
}
```

## 추가 개선 사항

### 1. API 엔드포인트 개선
현재 `/api/community` 엔드포인트를 수정하여 페이지네이션과 필터링 기능을 강화하고, 에러 처리를 개선해야 합니다.

### 2. 상태 관리 개선
Zustand를 활용하여 커뮤니티 상태를 전역적으로 관리하면 컴포넌트 간 상태 공유가 용이해집니다.

```jsx
// 예시: communityStore.ts
import { create } from 'zustand';
import { Post } from '@/types/post';

interface CommunityState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  fetchPosts: (page?: number) => Promise<void>;
  createPost: (content: string, tags: string[]) => Promise<void>;
  likePost: (postId: number) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  
  fetchPosts: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`/api/community?page=${page}&limit=5`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      
      set(state => ({
        posts: page === 1 ? data.data : [...state.posts, ...data.data],
        page,
        hasMore: page < data.total_pages,
        error: null,
      }));
    } catch (error) {
      set({ error: '게시글을 불러오는데 실패했습니다.' });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  createPost: async (content, tags) => {
    // 구현 예정
  },
  
  likePost: async (postId) => {
    // 구현 예정
  },
}));
```

### 3. 댓글 시스템 구현
각 게시글에 댓글을 추가할 수 있는 기능을 구현하여 사용자 참여를 유도합니다.

### 4. 데이터 검증 및 보안 강화
사용자 입력 데이터의 유효성 검사와 API 요청 보안을 강화합니다.

### 5. 성능 최적화
React의 메모이제이션과 코드 분할을 활용하여 성능을 개선합니다.

### 6. 테스트 구현
Jest와 React Testing Library를 사용하여 컴포넌트 테스트를 구현합니다.

## 결론

커뮤니티 섹션은 사용자 참여와 상호작용을 증진시키는 중요한 부분입니다. 위의 개선 사항들을 적용하면 정적인 목 데이터 표시에서 동적이고 상호작용이 가능한 완전한 커뮤니티 기능으로 발전시킬 수 있습니다. 이러한 개선은 사용자 경험을 향상시키고 플랫폼의 가치를 높이는 데 기여할 것입니다.