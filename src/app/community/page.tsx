'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CommunitySection } from '@/components/sections/CommunitySection';
import { ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'all' | 'day' | 'week' | 'month' | 'year'>('all');
  const [selectedSortOrder, setSelectedSortOrder] = useState<'recent' | 'popular'>('recent');

  const timeFilters = [
    { value: 'all', label: '전체 기간' },
    { value: 'day', label: '오늘' },
    { value: 'week', label: '이번 주' },
    { value: 'month', label: '이번 달' },
    { value: 'year', label: '올해' }
  ];

  const sortOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'popular', label: '인기순' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">커뮤니티</h1>
            {tagParam && (
              <div className="flex items-center mt-2">
                <Link href="/community" className="text-purple-600 hover:underline text-sm flex items-center">
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  모든 게시글 보기
                </Link>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm ml-2">
                  #{tagParam}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4 mr-1.5" />
            필터
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">기간</h3>
                <div className="space-y-1">
                  {timeFilters.map((filter) => (
                    <label key={filter.value} className="flex items-center">
                      <input
                        type="radio"
                        name="timeFilter"
                        value={filter.value}
                        checked={selectedTimeFilter === filter.value}
                        onChange={() => setSelectedTimeFilter(filter.value as any)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">정렬</h3>
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="sortOrder"
                        value={option.value}
                        checked={selectedSortOrder === option.value}
                        onChange={() => setSelectedSortOrder(option.value as any)}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <CommunitySection
          limit={10}
          showTitle={false}
        />
      </div>
    </div>
  );
}