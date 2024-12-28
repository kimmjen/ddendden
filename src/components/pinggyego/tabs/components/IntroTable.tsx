
import {Clock, Loader2, User} from "lucide-react";
import {useEffect, useState} from "react";
import {Video} from "@/types/video";
import {formatDate, formatViewCount} from "@/lib/utils";
import {formatDuration} from "@/utils/format";

export const IntroTable = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/videos/pinggyego')
            .then(res => {
                if (!res.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다');
                }
                return res.json();
            })
            .then(data => {
                setVideos(data);
                if (data.length > 0) {
                    setCurrentVideo(data[0]);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin h-8 w-8 text-pink-500"/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                <tr>
                    <th className="p-4 text-left">에피소드</th>
                    <th className="p-4">썸네일</th>
                    <th className="p-4 text-left hidden lg:table-cell">설명</th>
                    <th className="p-4 text-left">게스트</th>
                    <th className="p-4 text-center">재생시간</th>
                    <th className="p-4 text-center hidden sm:table-cell">조회수</th>
                    <th className="p-4 text-center">업로드일</th>
                </tr>
                </thead>
                <tbody>
                {videos.map((video) => (
                    <tr key={video.video_id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                            <div className="font-semibold">
                                EP.{video.title.match(/EP\.(\d+)/)?.[1] || '-'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {video.title.split('ㅣ')[0]}
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="relative w-24 h-16">
                                <img
                                    src={video.thumbnail_urls.default}
                                    alt={video.title}
                                    className="object-cover rounded"
                                />
                            </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 hidden lg:table-cell max-w-md">
                            {video.description.split('\n')[0]}
                        </td>
                        <td className="p-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2"/>
                                {video.guest}
                            </div>
                        </td>
                        <td className="p-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <Clock className="w-4 h-4 mr-2"/>
                                {formatDuration(video.duration_seconds)}
                            </div>
                        </td>
                        <td className="p-4 text-center hidden sm:table-cell">
                            {formatViewCount(video.statistics.viewCount)}
                        </td>
                        <td className="p-4 text-center whitespace-nowrap">
                            {formatDate(video.published_at)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}