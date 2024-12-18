'use client'

import { useState} from "react";
import { IntroTab, VideoTab, CastTab, CommentTab } from '@/components/punghyanggo/tabs';
import { useTranslation } from '@/i18n/client';

type TabId = 'intro' | 'videos' | 'cast' | 'comments';

const TAB_COMPONENTS = {
    'intro': IntroTab,
    'videos': VideoTab,
    'cast': CastTab,
    'comments': CommentTab
} as const;

export default function PungHyanggoPage() {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState<TabId>('intro');
    const tabs: Array<{ id: TabId; label: string }> = [
        { id: 'intro', label: t('tabs.intro') },
        { id: 'videos', label: t('tabs.videos') },
        { id: 'cast', label: t('tabs.cast') },
        { id: 'comments', label: t('tabs.comments') }
    ]

    const TabComponent = TAB_COMPONENTS[currentTab];
    return (
        <div className="min-h-screen">
            {/* 헤더 섹션 */}
            <div className="w-full bg-white border-b">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="py-8">
                        <h1 className="text-3xl font-bold mb-2">
                            {t('punghyanggo.title')}
                        </h1>
                        <p className="text-gray-600">
                            {t('punghyanggo.description')}
                        </p>
                    </div>
                    {/* 탭 네비게이션 */}
                    <div className="flex space-x-1 border-b">
                        {tabs.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => setCurrentTab(id)}
                                className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                                    currentTab === id
                                        ? 'border-b-2 border-pink-500 text-pink-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <TabComponent />
            </div>
        </div>
    );
}