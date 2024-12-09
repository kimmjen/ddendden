'use client';

import { Smartphone, Package, Crown, Trophy } from 'lucide-react';

const categories = [
    {
        icon: <Smartphone className="h-6 w-6" />,
        title: "핑계고",
        description: "앱/제품 리뷰",
        count: 128,
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: <Package className="h-6 w-6" />,
        title: "MINI 핑계",
        description: "미니어처 리뷰",
        count: 85,
        color: "bg-pink-50 text-pink-600"
    },
    {
        icon: <Crown className="h-6 w-6" />,
        title: "이달의 계원",
        description: "이달의 구독자",
        count: 24,
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: <Trophy className="h-6 w-6" />,
        title: "시상식",
        description: "연말 시상식",
        count: 12,
        color: "bg-amber-50 text-amber-600"
    }
];

export const CategorySection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category, index) => (
                <div
                    key={category.title}
                    className={`${category.color} rounded-xl p-6 transition-all hover:scale-105 cursor-pointer`}
                >
                    <div className="flex items-center space-x-3 mb-3">
                        {category.icon}
                        <h3 className="font-bold">{category.title}</h3>
                    </div>
                    <p className="text-sm mb-2 opacity-80">{category.description}</p>
                    <p className="text-sm font-medium">{category.count}개의 콘텐츠</p>
                </div>
            ))}
        </div>
    );
};