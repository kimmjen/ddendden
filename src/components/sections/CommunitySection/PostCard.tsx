'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types/post';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  onLike: (isLiked: boolean) => void;
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = post.images && post.images.length > 0;

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(isLiked);
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev === 0 ? post.images!.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev === post.images!.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      {/* 작성자 정보 */}
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
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      )}

      {/* 콘텐츠 */}
      <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>

      {/* 이미지 캐러셀 */}
      {hasImages && (
        <div className="relative rounded-lg overflow-hidden mb-4">
          <div className="aspect-video relative">
            <Image
              src={post.images![currentImageIndex]}
              alt={`Post image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
          
          {post.images!.length > 1 && (
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
                {post.images!.map((_, idx) => (
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
        <div className="mb-4 space-y-2 bg-purple-50 p-4 rounded-lg">
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
        <div className="flex flex-wrap gap-2 mb-4">
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
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-purple-600' : ''}`} />
            <span>{isLiked ? (post.likes + 1) : post.likes}</span>
          </button>
          <Link
            href={`/posts/${post.id}`}
            className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Link>
        </div>
        <button className="hover:text-purple-600 transition-colors p-1 rounded-full hover:bg-purple-50">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};