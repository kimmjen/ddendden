'use client';

import { useEffect } from 'react';
import { Award } from '@/types/award';
import Link from 'next/link';
import { Loader2, Trophy } from 'lucide-react';
import { useAwardStore } from "@/store/useAwardStore";

interface AwardsYearContentProps {
    year: string;
}

export function AwardsYearContent({ year }: AwardsYearContentProps) {
    const { awards, loading, error, setSelectedYear, fetchAwards } = useAwardStore();

    useEffect(() => {
        setSelectedYear(year);
        fetchAwards(year);
    }, [year, setSelectedYear, fetchAwards]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center text-red-500 space-y-4">
                <p>데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.</p>
                <button
                    onClick={() => fetchAwards(String(year))}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">{year}년 시상식</h1>
                <Link
                    href={`/admin-super/awards/${year}/new`}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                        transition-colors duration-200 font-medium flex items-center gap-2"
                >
                    <Trophy size={20} />
                    새 시상 추가
                </Link>
            </div>

            {/* Awards List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {awards.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {awards.map((award) => (
                            <div
                                key={award.id ?? `award-${award.title}`}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
                                        <p className="text-sm text-gray-500">{award.englishTitle}</p>
                                    </div>
                                    <Link
                                        href={`/admin-super/awards/${year}/${award.id}`}
                                        className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                                    >
                                        수정
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-gray-500">현재 등록된 시상이 없습니다.</div>
                )}
            </div>
        </div>
    );
}
