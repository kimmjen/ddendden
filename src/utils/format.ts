import dayjs from 'dayjs';

export const formatDate = (date: string) => {
    return dayjs(date).format('YYYY. MM. DD.');
};

export const formatNumber = (num: number) => {
    if (num >= 10000) {
        return `${Math.floor(num / 10000)}만`;
        // return `${Math.floor(n / 10000)}만 ${Math.floor((n % 10000) / 1000)}천`;
    } else if (num >= 1000) {
        return `${Math.floor(num / 1000)}천`;
    }
    return num;
};

export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:00` : `${minutes}:00`
}