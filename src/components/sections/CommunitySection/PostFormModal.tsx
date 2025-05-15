'use client';

import { useState } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

export const PostFormModal = ({ isOpen, onClose, onSubmit }: PostFormModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 태그 처리 - 쉼표로 구분된 문자열을 배열로 변환
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      
      // 사용자 정보 - 실제 앱에서는 로그인된 사용자 정보를 사용
      const postData = {
        author: {
          id: 100, // 임시 ID
          name: "뜬뜬계원", // 임시 사용자명
          avatar: "/images/avatar.webp" // 임시 아바타
        },
        title: title.trim() || undefined, // 제목이 없으면 undefined로 설정
        content: content.trim(),
        tags: tagArray.length > 0 ? tagArray : undefined
      };
      
      await onSubmit(postData);
      
      // 폼 초기화
      setTitle('');
      setContent('');
      setTags('');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('게시글을 작성하는 중 오류가 발생했습니다.');
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
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              제목 (선택사항)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="제목을 입력하세요"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="게시글 내용을 입력하세요..."
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="예: 핑계고, 미니핑계, 뜬뜬시상식"
              disabled={isSubmitting}
            />
          </div>
          
          {/* 이미지 업로드 기능은 추후 구현 */}
          <div className="text-center py-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
              onClick={() => alert('이미지 업로드 기능은 추후 구현 예정입니다.')}
            >
              <ImageIcon className="h-4 w-4 mr-1.5" />
              이미지 추가
            </button>
          </div>
          
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-1.5" />
                  게시 중...
                </>
              ) : '게시하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};