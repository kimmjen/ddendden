'use client';

import Image from 'next/image';
import {AwardCard} from "@/components/award/AwardCard";
import {AwardCard2} from "@/components/award/AwardCard2";
import {formatDate} from "@/lib/utils";
import {awards} from "../../../data/awards";
import {HeroBanner} from "@/components/award/HeroBanner";

export default function Award2023Page() {
    const videoData = {
            "video_id": "yrdlOEbXqp0",
            "title": "[EN] 제1회 핑계고 시상식 ㅣ EP.33",
            "description": "‘제1회 핑계고 시상식’에 참석해 주신\n계원 여러분들을 진심으로 환영합니다.\n\n그동안 함께 해준 우리 계원들 초대해서\n시상도 하고 축하 무대, 럭키드로우까지 풍성하게 준비해 봤는데\n사실 시상식은 핑계고~🐓\n첫돌 축하 겸 송년회 겸 그저 또 떠들어제껴보겠습니다.\n\n1년 내내 풍성한 토크의 장을 펼친 핑계고를 아껴주시는 마음으로\n‘제1회 핑계고 시상식’도 즐겨주시면 감사하겠습니다.\n\n[식순]\n\n00:00 오프닝\n10:17 근황 보고는 핑계고\n40:31 신인상\n52:06 이삭토스트 리얼 인기스타상\n55:47 축하 무대는 핑계고\n1:06:59 럭키드로우\n1:18:43 작품상\n1:23:40 우수상\n1:32:37 축하 무대 ✨초대 가수 있음✨\n1:42:13 최우수상\n1:53:44 대상\n1:57:28 엔딩\nㅡㅡㅡ\n유선배 복지 콘텐츠 🐓핑계고🐓\n우리도 언제 올릴지 몰라요 ⚠불시 업로드⚠\n☁구독 & 좋아요 & 알림설정 필수☁\n\nㅡㅡㅡ\n\n[채널 '뜬뜬' of 안테나플러스]\n연출 | 조은진 조수빈 김다윤 이은솔 추형록 오민주\n작가 | 김송화 최수정 김이진 정채휴 전우성\n\nㅡㅡㅡ\n\n👇’뜬뜬’ 소식 보러가기\n[https://instagram.com/ddeun._.ddeun]\n#뜬뜬 #핑계고 #시상식 #유재석 #지석진 #오나라 #홍진경 #송지효 #이동욱 #남창희 #조세호 #양세형 #이동휘 #샤이니 #키 #이미주 #권진아 #다비치\n\n- 본 콘텐츠와 무관한 내용의 댓글과 출연자에 대한 무분별한 욕설, 비난 및 조롱 등 악의적인 댓글은 무통보 삭제될 수 있습니다.\n- 이 영상은 TJ미디어의 반주곡 사용 허가를 받고 제작되었습니다.",
            "published_at": "2023-12-17T00:00:09Z",
            "duration": "PT2H5M38S",
            "duration_seconds": 7538,
            "thumbnail_urls": {
                "default": "https://i.ytimg.com/vi/yrdlOEbXqp0/default.jpg",
                "medium": "https://i.ytimg.com/vi/yrdlOEbXqp0/mqdefault.jpg",
                "high": "https://i.ytimg.com/vi/yrdlOEbXqp0/hqdefault.jpg",
                "standard": "https://i.ytimg.com/vi/yrdlOEbXqp0/sddefault.jpg",
                "maxres": "https://i.ytimg.com/vi/yrdlOEbXqp0/maxresdefault.jpg"
            },
            "tags": [
                "뜬뜬",
                "핑계고",
                "시상식",
                "핑계고시상식",
                "제1회",
                "드라마추천",
                "유재석",
                "지석진",
                "홍진경",
                "송지효",
                "오나라",
                "미주",
                "권진아",
                "나는운이좋았지",
                "새해노래추천",
                "연말플레이리스트",
                "이동욱",
                "양세형",
                "중고거래",
                "별의길",
                "시집",
                "시집추천",
                "남창희",
                "실비집",
                "조남지대",
                "조세호",
                "키",
                "링딩동",
                "샤이니",
                "기범이",
                "키범이",
                "이동휘",
                "크리스마스",
                "다비치",
                "매일크리스마스",
                "크리스마스플리",
                "캐롤추천",
                "8282",
                "김미김미",
                "노래방반주",
                "TJ미디어",
                "이삭토스트",
                "깁미깁미",
                "12월"
            ],
            "statistics": {
                "viewCount": 11050588,
                "likeCount": 165729,
                "commentCount": 16534
            },
            "video_type": "pinggyego",
            "url": "https://www.youtube.com/watch?v=yrdlOEbXqp0",
            "live_broadcast_content": "none"
        }
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
            {/* 최상단 비디오 배너 */}
            <HeroBanner video={videoData} />

            {/* 수상 내역 */}
            <div className="max-w-[1400px] mx-auto px-8 py-20 space-y-20">
                {/* 대상 섹션 - 전체 너비 */}
                <div className="w-full">
                    <AwardCard award={awards[0]} className="w-full" />
                </div>

                {/* 나머지 상 - 2열 그리드 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {awards.slice(1).map(award => (
                        <AwardCard key={award.title} award={award} />
                    ))}
                </div>
            </div>
        </div>
    );
}