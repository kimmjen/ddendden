import { NextResponse } from 'next/server';

export async function GET() {
    // 실제로는 DB나 외부 API에서 데이터를 가져옴
    const channelData = {
        name: "뜬뜬 DdeunDdeun",
        description: "좋은 사람, 좋은 이야기, 좋은 웃음, 우리 '뜬뜬'한 사이 돼봐요💕 \n" +
            "\n" +
            "🤓유선배 복지 콘텐츠🗣토크찌개맛집🥘\n" +
            "🐓핑계고🐓는 불시에 찾아옵니다! \n" +
            "----------------------------------------\n" +
            "바람 따라 떠나는 여행 ☁️풍향고☁️\n" +
            "11월 24일부터 매주 일요일 오전 9시에 떠나요✈️\n" +
            "\n" +
            "🙏🏻 plz 구독☝알림설정🔔 plz 🙏🏻\n" +
            "\n" +
            "뭐든지 문의할 땐, ddeunddeun@antenna.co.kr\n" +
            "인스타 놀러올 땐, @ddeun._.ddeun\n",
        subscribers: 2290000,
        totalViews: 523861924,
        videoCount: 276,
        publishedAt: '2022-10-04T07:24:23.973864Z',
        thumbnail: "https://yt3.ggpht.com/aOgjye3sMIxNl2SW2wAQZpZWUXzZ5Rg0rNITacRQKVfXvF9cnPWb77G3_gH5s2Zyw241BXWYWg=s800-c-k-c0x00ffffff-no-rj",
        email: "ddeunddeun@antenna.co.kr",
        instagram: "@ddeun._.ddeun"
    };

    return NextResponse.json(channelData);
}