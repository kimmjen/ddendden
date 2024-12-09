import {ScheduleCalendar} from "@/components/sections/Calendar";
import {MonthlyMembers} from "@/components/sections/SideSection/MonthlyMembers";
import {PopularTags} from "@/components/sections/SideSection/PopularTags";
import {CommunitySection} from "@/components/sections/CommunitySection";
import { MOCK_MEMBERS, MOCK_POSTS, MOCK_TAGS} from "@/constants/mockData";
import {ImageBanner} from "@/components/layout/ImageBanner";
import {SeriesSection} from "@/components/sections/SeriesSection";
import {SERIES_LIST} from "@/constants/seriesData";


export default function Home() {
    return (
        <div className="w-full overflow-hidden">
            {/*<Banner />*/}
            <ImageBanner />
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/*<CategorySection />*/}
                {/*<ChannelStats />*/}
                <SeriesSection series={SERIES_LIST}/>
                {/*<VideoSection videos={MOCK_VIDEOS} />*/}
                {/* 두 열 레이아웃 */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                    {/* 메인 콘텐츠 */}
                    <div>
                        {/*<FeaturedVideos title="최신 업로드" videos={LATEST_VIDEOS} />*/}
                    <CommunitySection posts={MOCK_POSTS} />
                        {/*<FAQ />*/}
                    </div>

                    {/* 사이드바 */}
                    <div className="space-y-6">
                        <ScheduleCalendar />
                        {/*<LiveChat />*/}
                        <MonthlyMembers members={MOCK_MEMBERS} />
                        <PopularTags tags={MOCK_TAGS} />
                    </div>
                </div>

                {/* 하단 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/*<ContactSection />*/}
                </div>
            </div>
        </div>
    );
}