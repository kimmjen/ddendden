import Image from 'next/image'

export const IntroTab = () => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* 이미지와 소개 영역 */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* 프로그램 대표 이미지 */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                        <Image
                            src="/images/punghyanggo.webp"  // 실제 이미지 경로로 수정 필요
                            alt="풍향고"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* 프로그램 소개 텍스트 */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4">프로그램 소개</h2>
                    <p className="text-gray-600 mb-4">
                        바람 따라 떠나는 여행

                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium mb-2">방송 정보</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex gap-2">
                                    <span className="text-gray-400 w-20">방영 기간</span>
                                    <span>2024년 11월 24일 ~ 2024년 12월 21일</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gray-400 w-20">방송 시간</span>
                                    <span>매주 한 편</span>
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

            {/* 태그 섹션 */}
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
    );
};