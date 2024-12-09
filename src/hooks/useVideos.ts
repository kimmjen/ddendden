import { useState, useEffect } from 'react';
import {Video} from "@/types/video";

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/videos/pinggyego');
                if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다');
                const data = await response.json();
                setVideos(data);
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return { videos, isLoading, error };
};