import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from 'date-fns';
import {ko} from 'date-fns/locale/ko';
import {enUS as en} from 'date-fns/locale/en-US';
import { useLanguageStore } from '@/store/languageStore';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatViewCount = (count: number): string => {
    const language = useLanguageStore.getState().language;

    if (language === 'ko') {
        if (count >= 10000) {
            return `${Math.floor(count / 10000)}만`;
        }
        if (count >= 1000) {
            return `${Math.floor(count / 1000)}천`;
        }
    } else {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
    }
    return count.toString();
};

export const formatTimeAgo = (dateString: string): string => {
    const language = useLanguageStore.getState().language;
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = language === 'ko' ? {
        년: 31536000,
        개월: 2592000,
        주: 604800,
        일: 86400,
        시간: 3600,
        분: 60
    } : {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            if (language === 'ko') {
                return `${interval}${unit} 전`;
            } else {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
    }

    return language === 'ko' ? '방금 전' : 'just now';
};

export const formatDate = (date: Date | string): string => {
    const language = useLanguageStore.getState().language;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const dateLocale = language === 'ko' ? ko : en;
    const formatString = language === 'ko' ? 'yyyy년 MM월 dd일' : 'MMM dd, yyyy';

    return format(dateObj, formatString, { locale: dateLocale });
};

const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:00` : `${minutes}:00`
}

export const formatDateDistance = (date: Date | string): string => {
    const language = useLanguageStore.getState().language;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const dateLocale = language === 'ko' ? ko : en;

    return formatDistanceToNow(dateObj, {
        locale: dateLocale,
        addSuffix: true
    });
};