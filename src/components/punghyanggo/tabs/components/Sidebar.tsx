import { FC } from 'react';
import {FilterSelect} from "@/components/pinggyego/tabs/components/FilterSelect";
import {useTranslation} from "@/i18n/client";
import {VideoCategory} from "@/types/video";

interface SidebarProps {
    currentCategory: VideoCategory;
    setCurrentCategory: (category: VideoCategory) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    period: string;
    setPeriod: (period: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
                                              currentCategory,
                                              setCurrentCategory,
                                              sortBy,
                                              setSortBy,
                                              period,
                                              setPeriod
                                          }) => {
    const { t } = useTranslation();

    const categories: VideoCategory[] = ['pinggyego', 'mini-pinggyego', 'pinggyego-live'];

    const sortOptions = [
        { value: 'latest', label: t('sidebar.sortOptions.latest') },
        { value: 'popular', label: t('sidebar.sortOptions.popular') },
        { value: 'views', label: t('sidebar.sortOptions.views') }
    ];

    const periodOptions = [
        { value: 'all', label: t('sidebar.periodOptions.all') },
        { value: 'month', label: t('sidebar.periodOptions.month') },
        { value: 'year', label: t('sidebar.periodOptions.year') }
    ];

    return (
        <aside className="lg:sticky lg:top-4 self-start">
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="mb-6">
                    <h3 className="font-medium mb-3">{t('sidebar.category')}</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setCurrentCategory(category)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    currentCategory === category
                                        ? 'bg-pink-50 text-pink-600'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                {t(`navigation.${category}`)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <FilterSelect
                        label={t('sidebar.sortLabel')}
                        value={sortBy}
                        onChange={setSortBy}
                        options={sortOptions}
                    />
                    <FilterSelect
                        label={t('sidebar.periodLabel')}
                        value={period}
                        onChange={setPeriod}
                        options={periodOptions}
                    />
                </div>
            </div>
        </aside>
    );
};