'use client';

import {Calendar, Clock} from 'lucide-react';
import {useTranslation} from "@/i18n/client";

interface ScheduleEvent {
    id: number;
    title: string;
    date: string;
    time: string;
    type: '핑계고' | 'MINI 핑계고' | '이달의 계원' | '시상식';
}

const MOCK_EVENTS: ScheduleEvent[] = [
    {
        id: 1,
        title: "새로운 핑계고 업로드",
        date: "2024-03-15",
        time: "18:00",
        type: "핑계고"
    },
    {
        id: 2,
        title: "MINI 핑계 라이브 방송",
        date: "2024-03-17",
        time: "20:00",
        type: "MINI 핑계고"
    }
];

export const ScheduleCalendar = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2"/>
                {t('ddendden')} {t('schedule')}
            </h2>
            <div className="space-y-4">
                {MOCK_EVENTS.map(event => (
                    <div
                        key={event.id}
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                        <div className="flex-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4 mr-1"/>
                                {event.date} {event.time}
                            </div>
                        </div>
                        <span className={`
                          px-3 py-1 rounded-full text-sm
                          ${event.type === '핑계고' ? 'bg-blue-100 text-blue-600' : ''}
                          ${event.type === 'MINI 핑계고' ? 'bg-pink-100 text-pink-600' : ''}
                        `}>
                          {event.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};