'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Users, FileText, Eye, PenSquare, Bell } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const [dashboardData] = useState({
        users: 1234,
        content: 567,
        visitors: 89,
        posts: 12,
    });

    const stats = [
        { title: '총 사용자', value: dashboardData.users, icon: Users, color: 'text-blue-600' },
        { title: '총 콘텐츠', value: dashboardData.content, icon: FileText, color: 'text-green-600' },
        { title: '오늘의 방문자', value: dashboardData.visitors, icon: Eye, color: 'text-yellow-600' },
        { title: '신규 게시물', value: dashboardData.posts, icon: PenSquare, color: 'text-red-600' },
    ];

    const chartData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                label: '방문자 수',
                data: [120, 200, 300, 500, 800, 700, 600],
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.8)',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const popularVideos = [
        { title: '최고의 코딩 강의', thumbnail: '/images/video1.jpg', views: 12345 },
        { title: '프로그래밍 꿀팁', thumbnail: '/images/video2.jpg', views: 10234 },
        { title: 'React 튜토리얼', thumbnail: '/images/video3.jpg', views: 9345 },
    ];

    const trendingKeywords = [
        { keyword: 'React', count: 1200 },
        { keyword: 'Next.js', count: 900 },
        { keyword: 'Tailwind CSS', count: 750 },
        { keyword: 'JavaScript', count: 620 },
    ];

    return (
        <div className={`min-h-screen p-6 transition-colors duration-200 bg-gray-50 text-gray-900}`}>
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">관리자 대시보드</h1>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-32 px-3 py-2 rounded-lg border border-gray-300"
                    >
                        <option value="today">오늘</option>
                        <option value="week">이번 주</option>
                        <option value="month">이번 달</option>
                    </select>
                </header>

                {/* 통계 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">{stat.title}</p>
                                    <p className="text-3xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 메인 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">방문자 통계</h2>
                        <Line data={chartData} className="h-[300px]" />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">최근 활동</h2>
                            <Bell className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { action: '게시물 "새 이벤트" 생성', time: '3분 전' },
                                { action: '사용자 "홍길동" 삭제', time: '1시간 전' },
                                { action: '게시물 "여름 프로모션" 수정', time: '어제' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <span className="text-sm">{activity.action}</span>
                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 추가 섹션: 인기 영상 및 검색어 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* 인기 영상 */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">가장 인기 있는 영상</h2>
                        <div className="space-y-4">
                            {popularVideos.map((video, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{video.title}</p>
                                        <p className="text-xs text-gray-500">
                                            조회수: {video.views.toLocaleString()}회
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 인기 검색어 */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">인기 검색어</h2>
                        <ul className="space-y-2">
                            {trendingKeywords.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{index + 1}. {item.keyword}</span>
                                    <span className="text-sm">{item.count.toLocaleString()}회</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
