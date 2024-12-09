'use client';

import { VideoCard } from "@/components/videos/VideoCard";
import { Series } from "@/types/series";
import { SeriesCard } from "@/components/series/SeriesCard";
import { useState } from 'react';
import {useTranslation} from "@/i18n/client";

type SortType = 'latest' | 'popular';
type StatusFilter = 'all' | 'ongoing' | 'ended';

interface SeriesSectionProps {
    series: Series[];
}

export const SeriesSection = ({ series }: SeriesSectionProps) => {
    const [sortType, setSortType] = useState<SortType>('latest');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('ongoing');
    const { t } = useTranslation();
    // 필터링 및 정렬된 시리즈
    const filteredAndSortedSeries = [...series]
        .filter(item => {
            if (statusFilter === 'all') return true;
            return statusFilter === 'ongoing' ? item.isOngoing : !item.isOngoing;
        })
        .sort((a, b) => {
            if (sortType === 'latest') {
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            }
            return 0;
        });

    const getButtonStyle = (currentStatus: string, buttonStatus: string) =>
        currentStatus === buttonStatus
            ? 'bg-pink-500 text-white'
            : 'bg-white text-gray-700 hover:bg-pink-50';

    return (
        <div className="mb-12">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{t('series.title')}</h2>
                <div className="flex flex-wrap gap-3">
                    {/* 상태 필터 버튼 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                getButtonStyle(statusFilter, 'all')
                            }`}
                        >
                            {t('series.filter.all')}
                        </button>
                        <button
                            onClick={() => setStatusFilter('ongoing')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                getButtonStyle(statusFilter, 'ongoing')
                            }`}
                        >
                            {t('series.filter.ongoing')}
                        </button>
                        <button
                            onClick={() => setStatusFilter('ended')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                getButtonStyle(statusFilter, 'ended')
                            }`}
                        >
                            {t('series.filter.ended')}
                        </button>
                    </div>

                    {/* 정렬 버튼 */}
                    {/*<div className="flex gap-2">*/}
                    {/*    <button*/}
                    {/*        onClick={() => setSortType('latest')}*/}
                    {/*        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${*/}
                    {/*            getButtonStyle(sortType, 'latest')*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        최신순*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        onClick={() => setSortType('popular')}*/}
                    {/*        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${*/}
                    {/*            getButtonStyle(sortType, 'popular')*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        인기순*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedSeries.map((series) => (
                    <SeriesCard
                        key={series.id}
                        series={series}
                    />
                ))}
            </div>

            {filteredAndSortedSeries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    해당하는 시리즈가 없습니다.
                </div>
            )}
        </div>
    );
};