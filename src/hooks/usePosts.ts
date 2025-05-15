import { useState, useEffect, useCallback } from 'react';
import { Post, PostsResponse } from '@/types/post';

interface UsePostsOptions {
  initialPage?: number;
  limit?: number;
  timeFilter?: 'all' | 'day' | 'week' | 'month' | 'year';
  tag?: string | null;
  sort?: 'recent' | 'popular';
}

export function usePosts({
  initialPage = 1,
  limit = 5,
  timeFilter = 'all',
  tag = null,
  sort = 'recent'
}: UsePostsOptions = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPosts = useCallback(async (pageToFetch: number = page, replace: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = `/api/posts?page=${pageToFetch}&limit=${limit}&time=${timeFilter}&sort=${sort}`;
      if (tag) url += `&tag=${tag}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      
      const data: PostsResponse = await response.json();
      
      // 결과 데이터 처리
      console.log('API 응답:', {
        pageToFetch,
        totalPages: data.total_pages,
        hasMore: pageToFetch < data.total_pages,
        itemCount: data.data.length,
        replace
      });
      
      setPosts(prev => replace ? data.data : [...prev, ...data.data]);
      setHasMore(pageToFetch < data.total_pages);
      setTotalPages(data.total_pages);
      setTotalItems(data.total_items);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      console.error('Error fetching posts:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [limit, timeFilter, tag, sort]); // page 의존성 제거

  // 초기 로드 및 필터 변경시 데이터 로드
  useEffect(() => {
    setPage(initialPage);
    fetchPosts(initialPage, true);
    
    // 개발 환경에서 디버그용 로그
    console.log('Filter changed - initializing with:', { 
      initialPage, limit, timeFilter, tag, sort 
    });
  }, [initialPage, limit, timeFilter, tag, sort, fetchPosts]);

  // 더 불러오기
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      
      // 개발 환경에서 디버그용 로그
      console.log('Loading more posts:', { currentPage: page, nextPage, hasMore });
      
      setPage(nextPage);
      fetchPosts(nextPage, false);
    } else {
      console.log('Cannot load more:', { isLoading, hasMore, page });
    }
  }, [isLoading, hasMore, page, fetchPosts]);

  // 새로고침
  const refresh = useCallback(() => {
    setPage(initialPage);
    return fetchPosts(initialPage, true);
  }, [initialPage, fetchPosts]);

  // 좋아요 토글
  const toggleLike = useCallback(async (postId: number, isLiked: boolean) => {
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const response = await fetch(`/api/posts/${postId}/like`, { method });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} post`);
      }
      
      const data = await response.json();
      
      // 포스트 상태 업데이트
      setPosts(prev => 
        prev.map(post => 
          post.id === postId || post.post_id === postId 
            ? { ...post, likes: data.likes, vote_count: data.vote_count } 
            : post
        )
      );
      
      return data;
    } catch (err) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, err);
      return null;
    }
  }, []);

  // 게시글 생성
  const createPost = useCallback(async (postData: {
    author: { id?: number; name: string; avatar?: string };
    title?: string;
    content: string;
    tags?: string[];
    images?: string[];
  }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      
      const data = await response.json();
      
      // 새 게시글을 목록 맨 앞에 추가
      setPosts(prev => [data.post, ...prev]);
      
      return data;
    } catch (err) {
      console.error('Error creating post:', err);
      return null;
    }
  }, []);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    page,
    totalPages,
    totalItems,
    loadMore,
    refresh,
    toggleLike,
    createPost
  };
}