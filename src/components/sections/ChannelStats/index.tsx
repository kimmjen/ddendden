'use client';

import { Users, PlaySquare, ThumbsUp, MessageCircle } from 'lucide-react';

const stats = [
    {
        icon: <Users className="h-6 w-6" />,
        label: "구독자",
        value: "22.9만",
        color: "text-red-500"
    },
    {
        icon: <PlaySquare className="h-6 w-6" />,
        label: "총 비디오",
        value: "276",
        color: "text-blue-500"
    },
    {
        icon: <ThumbsUp className="h-6 w-6" />,
        label: "총 좋아요",
        value: "150만+",
        color: "text-green-500"
    },
    {
        icon: <MessageCircle className="h-6 w-6" />,
        label: "총 댓글",
        value: "25만+",
        color: "text-purple-500"
    }
];

export const ChannelStats = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">채널 통계</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <div className={`${stat.color} flex justify-center mb-2`}>
                            {stat.icon}
                        </div>
                        <div className="font-bold text-2xl mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};