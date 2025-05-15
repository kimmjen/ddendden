'use client';

import { useState, useEffect, use } from 'react';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Post, Comment } from '@/types/post';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  // React.use()를 사용하여 params Promise 언래핑
  const resolvedParams = use(params);
  const postId = resolvedParams.id;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/posts/${postId}`);
        
        if (!response.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다.');
        }
        
        const postData = await response.json();
        setPost(postData);
        
        // 댓글 로드
        const commentsResponse = await fetch(`/api/posts/${postId}/comment`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const response = await fetch(`/api/posts/${postId}/like`, { method });
      
      if (response.ok) {
        const data = await response.json();
        setPost(prev => prev ? { ...prev, likes: data.likes, vote_count: data.vote_count } : null);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post || !commentContent.trim() || isSubmittingComment) return;
    
    try {
      setIsSubmittingComment(true);
      
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: {
            id: 100, // 임시 ID
            name: "뜬뜬계원", // 임시 사용자명
            avatar: "/images/avatar.webp" // 임시 아바타
          },
          content: commentContent,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // 새 댓글 추가
        const newComment: Comment = data.comment;
        setComments(prev => [newComment, ...prev]);
        
        // 게시글 댓글 수 업데이트
        setPost(prev => prev ? { ...prev, comments: data.comment_count } : null);
        
        // 폼 초기화
        setCommentContent('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handlePreviousImage = () => {
    if (post?.images && post.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? post.images!.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (post?.images && post.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === post.images!.length - 1 ? 0 : prev + 1));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="mb-4 text-red-600">{error || '게시글을 찾을 수 없습니다.'}</div>
        <Link href="/community" className="flex items-center text-purple-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          커뮤니티로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/community" className="inline-flex items-center text-purple-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            커뮤니티로 돌아가기
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 게시글 헤더 */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 relative">
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
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {post.is_pinned && (
                <span className="ml-auto px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  공지
                </span>
              )}
            </div>
            
            {/* 제목 (있을 경우에만 표시) */}
            {post.title && (
              <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            )}
          </div>
          
          {/* 게시글 본문 */}
          <div className="p-6">
            <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>
            
            {/* 이미지 캐러셀 */}
            {post.images && post.images.length > 0 && (
              <div className="rounded-lg overflow-hidden mb-6 relative">
                <div className="aspect-video relative">
                  <Image
                    src={post.images[currentImageIndex]}
                    alt={`Post image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain bg-black"
                  />
                </div>
                
                {post.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                      {post.images.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`block h-1.5 w-1.5 rounded-full ${
                            currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                          }`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* 투표 (있을 경우에만 표시) */}
            {post.poll_data && (
              <div className="mb-6 space-y-2 bg-purple-50 p-4 rounded-lg">
                {post.poll_data.choices.map((choice, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <div className="relative h-8 bg-white rounded-md overflow-hidden">
                        <div
                          className="absolute h-full bg-purple-200"
                          style={{ width: choice.vote_percentage }}
                        />
                        <div className="relative z-10 px-3 py-1.5 text-sm">
                          {choice.text}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-purple-600">
                      {choice.vote_percentage}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-2">
                  총 {post.poll_data.total_votes}명 참여
                </p>
              </div>
            )}
            
            {/* 태그 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/community?tag=${tag}`}
                    className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs hover:bg-purple-100 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* 상호작용 버튼 */}
            <div className="flex items-center justify-between text-gray-500 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button 
                  className={`flex items-center space-x-1 hover:text-purple-600 transition-colors ${isLiked ? 'text-purple-600' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-purple-600' : ''}`} />
                  <span className="font-medium">{isLiked ? post.likes + 1 : post.likes}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{post.comments}</span>
                </div>
              </div>
              <button className="hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-50">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 댓글 섹션 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">댓글 {post.comments}</h2>
          
          {/* 댓글 작성 폼 */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-3">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="댓글을 입력하세요..."
                rows={3}
                required
                disabled={isSubmittingComment}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center"
                disabled={isSubmittingComment || !commentContent.trim()}
              >
                {isSubmittingComment ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-1.5" />
                    등록 중...
                  </>
                ) : '댓글 등록'}
              </button>
            </div>
          </form>
          
          {/* 댓글 목록 */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 relative">
                      {comment.author.avatar ? (
                        <Image
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{comment.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm pl-11">{comment.content}</p>
                  <div className="mt-2 pl-11">
                    <button className="text-gray-500 hover:text-purple-600 text-xs flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}