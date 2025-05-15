'use client';

import { useState, useEffect } from 'react';
import { PostCard } from './PostCard';
import { ArrowRight, Loader2, Plus } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { PostFormModal } from './PostFormModal';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/types/post';

interface CommunitySectionProps {
  limit?: number;
  showTitle?: boolean;
  timeFilter?: 'all' | 'day' | 'week' | 'month' | 'year';
  sortOrder?: 'recent' | 'popular';
  posts?: Post[];
}

export const CommunitySection = ({
  limit = 3,
  showTitle = true,
  timeFilter: propTimeFilter,
  sortOrder: propSortOrder,
  posts: propPosts
}: CommunitySectionProps) => {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');
  
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'day' | 'week' | 'month' | 'year'>(propTimeFilter || 'all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'popular'>(propSortOrder || 'recent');

  // 외부에서 필터 props 변경 시 상태 업데이트
  useEffect(() => {
    if (propTimeFilter) {
      setTimeFilter(propTimeFilter);
    }
  }, [propTimeFilter]);

  useEffect(() => {
    if (propSortOrder) {
      setSortOrder(propSortOrder);
    }
  }, [propSortOrder]);

  // props로 posts가 전달되면 usePosts 훅을 사용하지 않음
  const {
    posts: apiPosts,
    isLoading,
    error,
    hasMore,
    loadMore,
    toggleLike,
    createPost,
    refresh
  } = usePosts(propPosts ? undefined : { 
    limit, 
    timeFilter, 
    tag: tagParam || null,
    sort: sortOrder
  });

  // props로 전달받은 posts가 있으면 그것을 사용, 없으면 API에서 가져온 posts 사용
  const displayPosts = propPosts || apiPosts;

  const handleCreatePost = async (postData: any) => {
    if (propPosts) {
      // props로 전달된 posts를 사용하는 경우 createPost 동작을 다르게 처리해야 함
      console.log('Creating post:', postData);
      setIsPostModalOpen(false);
      return true;
    }
    
    const result = await createPost(postData);
    if (result) {
      setIsPostModalOpen(false);
    }
    return result;
  };

  const handleToggleLike = (postId: number, isLiked: boolean) => {
    if (propPosts) {
      // props로 전달된 posts를 사용하는 경우 toggleLike 동작을 다르게 처리해야 함
      console.log('Toggle like:', postId, isLiked);
      return;
    }
    
    toggleLike(postId, isLiked);
  };

  const handleTimeFilterChange = (newFilter: 'all' | 'day' | 'week' | 'month' | 'year') => {
    setTimeFilter(newFilter);
    // 필터 변경 시 데이터 새로고침 (usePosts 내부에서 자동으로 처리됨)
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
          <div className="flex items-center space-x-4">
            <select
              className="text-sm text-gray-600 border border-gray-300 rounded-md p-1"
              value={timeFilter}
              onChange={(e) => handleTimeFilterChange(e.target.value as any)}
            >
              <option value="all">전체</option>
              <option value="day">오늘</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
              <option value="year">올해</option>
            </select>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium gap-1 transition-colors"
            >
              <Plus size={16} />
              글쓰기
            </button>
          </div>
        </div>
      )}

      {error && !propPosts && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {tagParam && (
        <div className="p-3 bg-purple-50 text-purple-700 rounded-md mb-4 text-sm">
          <strong>#{tagParam}</strong> 태그로 필터링된 게시글을 보고 있습니다.
        </div>
      )}

      {displayPosts.length === 0 && !isLoading ? (
        <div className="p-8 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">게시글이 없습니다.</p>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            첫 게시글 작성하기
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={(isLiked) => handleToggleLike(post.id, isLiked)}
            />
          ))}
        </div>
      )}

      {isLoading && !propPosts && (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
        </div>
      )}

      {!isLoading && hasMore && !propPosts && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              console.log('더보기 버튼 클릭');
              loadMore();
            }}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors flex items-center gap-1"
          >
            더 보기
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <PostFormModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};