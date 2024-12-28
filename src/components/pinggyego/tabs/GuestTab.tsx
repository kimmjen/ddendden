'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface GuestStat {
    name: string;
    appearances: number;
    firstEpisode: string;
    lastEpisode: string;
}

interface GuestResponse {
    totalGuests: number;
    guests: GuestStat[];
}

export const GuestTabs = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'stats' | 'table'>('stats');
    const [guestStats, setGuestStats] = useState<GuestStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof GuestStat;
        direction: 'asc' | 'desc';
    }>({ key: 'appearances', direction: 'desc' });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/guests');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data: GuestResponse = await response.json();
                setGuestStats(data.guests);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSort = (key: keyof GuestStat) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortedData = () => {
        return [...guestStats].sort((a, b) => {
            const multiplier = sortConfig.direction === 'asc' ? 1 : -1;

            if (sortConfig.key === 'appearances') {
                return multiplier * (a.appearances - b.appearances);
            }
            return multiplier * String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
        });
    };

    const renderTabs = () => (
        <div className="flex space-x-2 mb-6">
            <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'list'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
                게스트 목록
            </button>
            <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'stats'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
                출연 통계
            </button>
            <button
                onClick={() => setActiveTab('table')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'table'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
                상세 정보
            </button>
        </div>
    );

    const renderList = () => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {guestStats.map((guest) => (
                <div
                    key={guest.name}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 mb-3" />
                    <p className="text-center font-medium">{guest.name}</p>
                </div>
            ))}
        </div>
    );

    const renderStats = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getSortedData().slice(0, 12).map((guest) => (
                <div
                    key={guest.name}
                    className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                    <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4" />
                    <h3 className="font-medium text-lg mb-2">{guest.name}</h3>
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500">
                            출연 {guest.appearances}회
                        </p>
                        <p className="text-xs text-gray-400">
                            첫 출연: {guest.firstEpisode}
                        </p>
                        <p className="text-xs text-gray-400">
                            최근 출연: {guest.lastEpisode}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderTable = () => (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-white">
                <thead>
                <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}>
                        <div className="flex items-center space-x-1">
                            <span>이름</span>
                            {sortConfig.key === 'name' && (
                                sortConfig.direction === 'asc' ?
                                    <ChevronUp className="w-4 h-4" /> :
                                    <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </th>
                    <th className="px-4 py-3 text-left border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('appearances')}>
                        <div className="flex items-center space-x-1">
                            <span>출연 횟수</span>
                            {sortConfig.key === 'appearances' && (
                                sortConfig.direction === 'asc' ?
                                    <ChevronUp className="w-4 h-4" /> :
                                    <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </th>
                    <th className="px-4 py-3 text-left border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('firstEpisode')}>
                        <div className="flex items-center space-x-1">
                            <span>첫 출연</span>
                            {sortConfig.key === 'firstEpisode' && (
                                sortConfig.direction === 'asc' ?
                                    <ChevronUp className="w-4 h-4" /> :
                                    <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </th>
                    <th className="px-4 py-3 text-left border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('lastEpisode')}>
                        <div className="flex items-center space-x-1">
                            <span>최근 출연</span>
                            {sortConfig.key === 'lastEpisode' && (
                                sortConfig.direction === 'asc' ?
                                    <ChevronUp className="w-4 h-4" /> :
                                    <ChevronDown className="w-4 h-4" />
                            )}
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {getSortedData().map((guest) => (
                    <tr key={guest.name} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b">{guest.name}</td>
                        <td className="px-4 py-3 border-b">{guest.appearances}회</td>
                        <td className="px-4 py-3 border-b">{guest.firstEpisode}</td>
                        <td className="px-4 py-3 border-b">{guest.lastEpisode}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    if (isLoading) {
        return (
            <div>
                {renderTabs()}
                <div className="text-center py-12">데이터를 불러오는 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {renderTabs()}
                <div className="text-center py-12 text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {renderTabs()}
            {activeTab === 'list' && renderList()}
            {activeTab === 'stats' && renderStats()}
            {activeTab === 'table' && renderTable()}
        </div>
    );
};