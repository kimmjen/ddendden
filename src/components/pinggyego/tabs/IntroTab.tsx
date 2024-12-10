import Image from 'next/image'
import {Clock, User} from 'lucide-react'
import {IntroTable} from "@/components/pinggyego/tabs/components/IntroTable";

export const IntroTab = () => {
    const episodes = [
        {
            number: 1,
            title: "맛있는 음식 탐방",
            date: "2022-11-17",
            thumbnail: "/api/placeholder/120/68",
            description: "서울의 숨은 맛집을 찾아서 떠나는 여정",
            guest: "김맛있",
            duration: "32:10"
        }
    ];

    const recentEpisodes = [
        {
            id: 1,
            title: "첫 번째 식사",
            duration: "32:10",
            thumbnail: "/images/ep1.webp"
        },
        {
            id: 2,
            title: "두 번째 식사",
            duration: "28:45",
            thumbnail: "/images/ep2.webp"
        }
    ];



    return (
        <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                {/* 기존 이미지와 소개 영역 */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                            <Image
                                src="/images/pinggyego.webp"
                                alt="핑계고"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">프로그램 소개</h2>
                        <p className="text-gray-600 mb-4">
                            안테나의 신규 예능 프로그램 '핑계고'는 유재석과 맛있는 식사를 하며
                            일상 속 이야기를 나누는 토크쇼입니다.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium mb-2">방송 정보</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex gap-2">
                                        <span className="text-gray-400 w-20">방영 기간</span>
                                        <span>2022년 11월 17일 ~</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-400 w-20">방송 시간</span>
                                        <span>비정기</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-400 w-20">제작</span>
                                        <span>안테나 플러스</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">출연진</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                    <div>
                                        <p className="font-medium">유재석</p>
                                        <p className="text-sm text-gray-500">MC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #웹예능
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #토크쇼
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #밥친구
                    </span>
                </div>
            </div>

            <IntroTable />

            {/* 에피소드 섹션 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">최근 에피소드</h2>
                <div className="grid gap-4">
                    {recentEpisodes.map((episode) => (
                        <div key={episode.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="relative w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={episode.thumbnail}
                                    alt={episode.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-between flex-1">
                                <h3 className="font-medium">{episode.title}</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {episode.duration}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};