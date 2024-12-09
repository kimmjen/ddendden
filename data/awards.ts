import {Award} from "@/types/award";

export const awards: Award[] = [
    {
        title: "대상",
        englishTitle: "Daesang",
        type: "single",
        nominees: [
            {
                name: "남창희",
                works: ["조찬 모임은 핑계고", "신년모임은 핑계고", "수란은 핑계고"]
            },
            {
                name: "송은이",
                works: ["몸보신은 핑계고", "이열치열은 핑계고", "닮은꼴은 핑계고"]
            },
            {
                name: "이동욱",
                works: ["설 연휴는 핑계고", "수란은 핑계고", "쿠폰 완성은 핑계고"]
            },
            {
                name: "조세호",
                works: ["조찬 모임은 핑계고", "설 연휴는 핑계고", "편한 동생들은 핑계고"]
            },
            {
                name: "주우재",
                works: ["230222 mini핑계고", "100만 기념은 핑계고", "(live)귀성길은 핑계고"]
            },
            {
                name: "지석진",
                works: ["산책은 핑계고", "피크닉은 핑계고", "편한 동생들은 핑계고"]
            }
        ],
        winner: {
            name: "이동욱",
            works: ["설 연휴는 핑계고", "수란은 핑계고", "쿠폰 완성은 핑계고"],
            description: "다정하면서도 거침없는 '단짠' 캐릭터로 계주와의 찰떡 호흡을 자랑, 배우 영역을 넘어 유투버로서의 가능성을 보여줬다는 평을 받음",
            prize: "핑계고의 마스코트인 닭 모양의 한 돈 반 금반지"
        },
        votingMethod: "100% 온라인 계원 투표",
        image: "/images/daesang.webp"
    },
    {
        title: "최우수상",
        englishTitle: "Grand Award",
        type: "multiple",
        nominees: [
            {
                name: "남창희",
                works: ["조찬 모임은 핑계고", "신년모임은 핑계고", "수란은 핑계고"]
            },
            {
                name: "송은이",
                works: ["몸보신은 핑계고", "이열치열은 핑계고", "닮은꼴은 핑계고"]
            },
            {
                name: "이동욱",
                works: ["설 연휴는 핑계고", "수란은 핑계고", "쿠폰 완성은 핑계고"]
            },
            {
                name: "조세호",
                works: ["조찬 모임은 핑계고", "설 연휴는 핑계고", "편한 동생들은 핑계고"]
            },
            {
                name: "주우재",
                works: ["230222 mini핑계고", "100만 기념은 핑계고", "(live)귀성길은 핑계고"]
            },
            {
                name: "지석진",
                works: ["산책은 핑계고", "피크닉은 핑계고", "편한 동생들은 핑계고"]
            }
        ],
        winners: [
            {
                name: "조세호",
                works: ["조찬 모임은 핑계고", "설 연휴는 핑계고", "편한 동생들은 핑계고"],
                description: "무려 14편의 핑계고에서 활약, 단순히 재미를 넘어 토크의 전환점을 만들었다는 호평을 받음"
            },
            {
                name: "지석진",
                works: ["산책은 핑계고", "피크닉은 핑계고", "편한 동생들은 핑계고"],
                description: "총 10편의 핑계고에서 편안한 재담을 보여주며 개국공신으로 멋진 활약을 했다는 호평을 받음"
            }
        ],
        note: "전문 심사위원단의 동점이 나와 공동수상을 하였다.",
        image: "/images/GrandAward.webp"
    },
    {
        title: "우수상",
        englishTitle: "Excellence Award",
        type: "single",
        nominees: [
            {
                name: "김숙",
                works: ["이열치열은 핑계고"]
            },
            {
                name: "데프콘",
                works: ["보답은 핑계고"]
            },
            {
                name: "양세찬",
                works: ["봄맞이는 핑계고", "추석 연휴는 핑계고"]
            },
            {
                name: "이동휘",
                works: ["대화합은 핑계고"]
            },
            {
                name: "장항준",
                works: ["미스터리는 핑계고", "닮은꼴은 핑계고"]
            },
            {
                name: "차태현",
                works: ["커피 한잔은 핑계고", "커피 두세 잔은 핑계고"]
            },
            {
                name: "하하",
                works: ["봄맞이는 핑계고", "가을맞이는 핑계고"]
            },
            {
                name: "홍진경",
                works: ["신년모임은 핑계고", "가짜의 삶은 핑계고"]
            }
        ],
        winner: {
            name: "홍진경",
            works: ["신년모임은 핑계고", "가짜의 삶은 핑계고"],
            description: "대체 불가한 존재감으로 핑계고의 방향성에 가장 부합하는 게스트라는 호평을 받음"
        },
        image: "/images/ExcellenceAward.webp"
    },
    {
        title: "작품상",
        englishTitle: "Best Work Award",
        type: "multiple",
        winner: {
            work: "설 연휴는 핑계고",
            members: [
                {
                    name: "유재석",
                    role: "계주"
                },
                {
                    name: "이동욱"
                },
                {
                    name: "조세호"
                },
                {
                    name: "남창희"
                }
            ],
            description: "명절 연휴를 함께 보내는 듯한 분위기로 구독자분들에게 큰 사랑을 받은 팀, 최근 핑계고 콘텐츠 중 첫 1,000만 조회 수 달성",
            stats: {
                views: 1000000
            }
        },
        votingMethod: "100% 온라인 계원 투표",
        note: "4명이 나와 수상하였다.",
        image: "/images/ProductAward.webp"
    },
    {
        title: "이삭토스트 리얼 인기스타상",
        englishTitle: "Real Popularity Award",
        type: "multiple",
        winners: [
            {
                name: "이동욱",
                works: ["설 연휴는 핑계고"],
                rank: 1,
                votes: {
                    count: 53587,
                    percentage: 45.3
                }
            },
            {
                name: "조세호",
                works: ["조찬 모임은 핑계고"],
                rank: 2,
                votes: {
                    count: 22995,
                    percentage: 19.4
                }
            },
            {
                name: "남창희",
                works: ["조찬 모임은 핑계고"],
                rank: 3,
                votes: {
                    count: 21065,
                    percentage: 17.8
                }
            }
        ],
        votingMethod: "100% 온라인 계원 투표",
        prize: "이삭토스트 10만원권 상품권",
        sponsor: "이삭토스트",  // 스폰서 정보 추가
        totalVotes: 97647,     // 전체 투표수
        image: "/images/RealPopularityAward.webp"
    },
    {
        title: "신인상",
        englishTitle: "Rookie Award",
        type: "single",
        nominees: [
            {
                name: "공유",
                works: ["추석 연휴는 핑계고"]
            },
            {
                name: "김은희",
                works: ["미스터리는 핑계고"]
            },
            {
                name: "유연석",
                works: ["커피 한잔은 핑계고"]
            },
            {
                name: "이용주",
                works: ["100만 기념은 핑계고"]
            },
            {
                name: "호시",
                works: ["여름 휴가는 핑계고"]
            }
        ],
        winner: {
            name: "유연석",
            works: ["커피 한잔은 핑계고"],
            description: "침투력 있는 토크로 '안연석이~'라는 별명을 확득 '유연석의 재발견'이라는 평을 받음",
            nicknames: ["안연석이"],  // 별명 정보 추가
            specialNote: "수상자가 시상식에 불참하여 영상으로 수상소감을 하였다."  // 특이사항
        },
        image: "/images/RookieAward.webp"
    },
    {
        title: "공로상",
        englishTitle: "Achievement Award",
        type: "special",  // 특별상 형태
        winner: {
            name: "계원♥",  // 팬덤을 의미
            works: ["핑계고"],  // 전체 시리즈
            description: "불철주야 핑계고 보기를 멈추지 않으며 채널의 성장과 발전에 공헌하였기에 이 상을 수여함",
            specialNote: "제1회 핑계고 시상식 영상 마지막에 공로상을 비췄다."
        },
        isDedicatedToFans: true,  // 팬덤 헌정 상
        presentationTiming: "마지막",  // 시상 타이밍
        image: "/images/AchievementAward.webp"
    }
];