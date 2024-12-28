'use client';

import { useEffect, useState } from 'react';
import {Loader2} from "lucide-react";

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

export const CastTab = () => {
    const [guestStats, setGuestStats] = useState<GuestStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGuestStats = async () => {
            try {
                const response = await fetch('/api/cast');
                if (!response.ok) {
                    throw new Error('Failed to fetch guest stats');
                }
                const data: GuestResponse = await response.json();
                setGuestStats(data.guests);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGuestStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500"/>
            </div>
        )

    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {guestStats.map((guest, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                    >
                        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                            <img
                                src={`/api/placeholder/96/96`}
                                alt={guest.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
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

            {guestStats.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    출연진 데이터가 없습니다.
                </div>
            )}
        </div>
    );
};