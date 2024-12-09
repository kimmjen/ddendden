// src/components/series/SeriesCard.tsx
'use client';

import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Series } from "@/types/series";
import {useTranslation} from "@/i18n/client";

interface SeriesCardProps {
    series: Series;
}

export const SeriesCard = ({series}: SeriesCardProps) => {
    const genres = Array.isArray(series.genre) ? series.genre : [series.genre];
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* 썸네일 영역 - 비율 조정 */}
            <div className="aspect-[4/3] relative group">
                <Image
                    src={series.thumbnail_urls}
                    alt={series.title}
                    fill
                    className="transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 468px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* 콘텐츠 영역 - 패딩 축소 */}
            <div className="p-3">
                {/* 제목 영역 - 마진 축소 */}
                <div className="mb-2">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-base">{series.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                            series.isOngoing
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-600'
                                    }`}>
                            {series.isOngoing ? t('series.filter.ongoing') : t('series.filter.ended')}
                        </span>
                    </div>
                    {series.subTitle && (
                        <p className="text-sm text-gray-500 mt-0.5">{series.subTitle}</p>
                    )}
                </div>

                {/* 정보 영역 - 간격 축소 */}
                <div className="space-y-1 text-sm mb-2">
                    <div className="flex gap-x-2 text-gray-600">
                        <span className="min-w-[65px] text-gray-400">방영 기간</span>
                        <span className="flex-1">
                            {formatDate(series.startDate)}
                            {series.isOngoing ? ` ~ ${t('date.present')}` : ` ~ ${formatDate(series.endDate!)}`}
                        </span>
                    </div>

                    <div className="flex gap-x-2 text-gray-600">
                        <span className="min-w-[65px] text-gray-400">출연진</span>
                        <span className="flex-1">{series.cast.join(', ')}</span>
                    </div>

                    <div className="flex gap-x-2 text-gray-600">
                        <span className="min-w-[65px] text-gray-400">방영 시간</span>
                        <span className="flex-1">{series.schedule}</span>
                    </div>

                    <div className="flex gap-x-2 text-gray-600">
                        <span className="min-w-[65px] text-gray-400">제작</span>
                        <span className="flex-1">{series.production}</span>
                    </div>
                </div>

                {/* 태그 영역 */}
                <div className="flex flex-wrap gap-1.5">
                    {genres.map((genreItem, index) => (
                        <span
                            key={`${genreItem}-${index}`}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                            {genreItem}
                        </span>
                    ))}
                    {series.platform && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {series.platform}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};