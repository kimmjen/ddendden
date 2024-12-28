'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award } from '@/types/award';
import { Trophy, Users, Star, Crown, Loader2 } from 'lucide-react';

export function AwardsContent() {
    const [awards, setAwards] = useState<Award[]>([]);
    const years = ['2024', '2023'];
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAwards = async () => {
            setLoading(true);
            setError(null); // 이전 에러 상태 초기화
            try {
                const response = await fetch(`/api/admin-super/awards/${selectedYear}`);
                if (!response.ok) throw new Error(`Failed to fetch awards for ${selectedYear}`);
                const data = await response.json();
                setAwards(Array.isArray(data) ? data : []);
            } catch (err: any) {
                console.error('Failed to fetch awards:', err);
                setError(err.message);
                setAwards([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, [selectedYear]);

    // 검색 기능 적용
    const filteredAwards = awards.filter((award) =>
        award.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        {
            icon: Trophy,
            label: '총 시상 수',
            value: awards.length,
            color: 'indigo',
        },
        {
            icon: Users,
            label: '단일 수상',
            value: awards.filter((a) => a.type === 'single').length,
            color: 'emerald',
        },
        {
            icon: Star,
            label: '다수 수상',
            value: awards.filter((a) => a.type === 'multiple').length,
            color: 'blue',
        },
        {
            icon: Crown,
            label: '특별상',
            value: awards.filter((a) => a.type === 'special').length,
            color: 'amber',
        },
    ];

    // 로딩 상태
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500" />
            </div>
        );
    }

    // 에러 상태
    if (error) {
        return (
            <div className="text-center text-red-500">
                에러 발생: {error}{' '}
                <button
                    onClick={() => window.location.reload()}
                    className="text-indigo-600 hover:underline"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 연도 선택 */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`
                                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                                ${selectedYear === year
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            `}
                        >
                            {year}년도
                        </button>
                    ))}
                </nav>
            </div>

            {/* 헤더 */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">{selectedYear}년 시상식 관리</h1>
                <Link
                    href={`/admin-super/awards/${selectedYear}/new`}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700
                        transition-colors duration-200 font-medium flex items-center gap-2"
                >
                    <Trophy size={20} />
                    새 시상 추가
                </Link>
            </div>

            {/* 검색 입력 */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="시상 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 bg-${color}-50 rounded-lg`}>
                                <Icon className={`w-6 h-6 text-${color}-600`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{label}</p>
                                <p className="text-2xl font-bold text-gray-900">{value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 시상 목록 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">시상 목록</h2>
                </div>

                <div className="divide-y divide-gray-100">
                    {filteredAwards.map((award) => (
                        <div key={award.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex justify-between items-center">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
                                    <p className="text-sm text-gray-500">{award.englishTitle}</p>
                                </div>
                                <Link
                                    href={`/admin-super/awards/${selectedYear}/${award.id}`}
                                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50
                                        rounded-lg hover:bg-indigo-100 transition-colors duration-150"
                                >
                                    수정
                                </Link>
                            </div>
                        </div>
                    ))}
                    {filteredAwards.length === 0 && (
                        <div className="p-6 text-gray-500">검색 결과가 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
