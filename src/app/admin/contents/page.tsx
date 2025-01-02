'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FileText, BarChart, Eye, Users, PlusCircle, Search, Filter, Download } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ContentsDashboard() {
    const stats = [
        { title: '전체 콘텐츠', value: 123, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { title: '핑계고 콘텐츠', value: 45, icon: BarChart, color: 'text-green-600', bgColor: 'bg-green-50' },
        { title: '미니 핑계고 콘텐츠', value: 34, icon: Eye, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
        { title: '풍향고 콘텐츠', value: 20, icon: Users, color: 'text-red-600', bgColor: 'bg-red-50' },
        { title: '이달의 계원 콘텐츠', value: 24, icon: PlusCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    ];

    const chartData = {
        labels: ['핑계고', '미니 핑계고', '풍향고', '이달의 계원'],
        datasets: [
            {
                label: '콘텐츠 개수',
                data: [45, 34, 20, 24],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                ],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuad' as const, // 타입 강제 설정
        },
    };


    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-gray-800">콘텐츠 관리 대시보드</h1>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 text-gray-600 border border-gray-200 transition-all duration-200">
                            <Filter className="w-4 h-4" />
                            필터
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 text-gray-600 border border-gray-200 transition-all duration-200">
                            <Download className="w-4 h-4" />
                            내보내기
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                        <span className={`text-sm font-medium ${stat.color}`}>
                                            +2.5%
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                    <p className="text-3xl font-bold mt-1 text-gray-800">{stat.value.toLocaleString()}</p>
                                </div>
                                <div className="h-1 w-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                                    <div className={`h-full w-2/3 ${stat.color.replace('text', 'bg')}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">콘텐츠 분포</h2>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Search className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="h-80">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">빠른 작업</h2>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors group">
                                <span className="font-medium">새 콘텐츠 추가</span>
                                <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors group">
                                <span className="font-medium">콘텐츠 분석</span>
                                <BarChart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors group">
                                <span className="font-medium">통계 보고서</span>
                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">콘텐츠 관리</h2>
                            <p className="text-gray-600 leading-relaxed max-w-2xl">
                                이 페이지에서는 전체 콘텐츠에 대한 통계를 확인하고, 세부적인 관리 기능으로 이동할 수 있습니다.
                                각 콘텐츠 카테고리에 대해 상세 관리가 필요하면 왼쪽 네비게이션에서 해당 카테고리를 선택하세요.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                                새 콘텐츠 추가
                            </button>
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                전체 콘텐츠 보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}