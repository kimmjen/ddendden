'use client';

import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from "@/i18n/client";

interface ScheduleEvent {
    id: number;
    title: string;
    date: string;
    time: string;
    type: '핑계고' | 'MINI 핑계고' | '이달의 계원' | '시상식' | '풍향고';
}

const MOCK_EVENTS: ScheduleEvent[] = [
    {
        id: 1,
        title: "풍향고 EP.4",
        date: "2024-12-21",
        time: "09:00",
        type: "풍향고"
    },
    {
        id: 2,
        title: "제 2회 핑계고 시상식",
        date: "2024-12-22",
        time: "09:00",
        type: "시상식"
    }
];

const getEventTypeStyles = (type: ScheduleEvent['type']) => {
    const styles = {
        '핑계고': 'bg-pink-100 text-pink-600 border border-pink-200',
        'MINI 핑계고': 'bg-pink-100 text-pink-600 border border-pink-200',
        '이달의 계원': 'bg-purple-100 text-purple-600 border border-purple-200',
        '시상식': 'bg-yellow-100 text-yellow-600 border border-yellow-200',
        '풍향고': 'bg-blue-100 text-blue-600 border border-blue-200'
    };
    return styles[type] || 'bg-gray-100 text-gray-600 border border-gray-200';
};

export const ScheduleCalendar = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* 헤더 */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-pink-500"/>
                        <span>{t('ddendden')} {t('schedule')}</span>
                    </h2>
                    <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center transition-colors">
                        전체 보기
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* 이벤트 목록 */}
            <div className="divide-y divide-gray-50">
                {MOCK_EVENTS.map(event => (
                    <div
                        key={event.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-2">

                            <h3 className="font-medium text-gray-900 hover:text-pink-500 transition-colors cursor-pointer">
                                {event.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1"/>
                                {new Date(event.date).toLocaleDateString('ko-KR', {
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                {' '}
                                {event.time}
                            </div>
                        </div>
                        <span className={`
                                px-3 py-1 rounded-full text-sm font-medium
                                ${getEventTypeStyles(event.type)}
                            `}>
                                {event.type}
                            </span>

                    </div>
                ))}
            </div>

            {/* 빈 상태 */}
            {MOCK_EVENTS.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    예정된 일정이 없습니다.
                </div>
            )}
        </div>
    );
};