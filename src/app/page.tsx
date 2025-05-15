'use client';

import { useState, useEffect } from 'react';
import { ScheduleCalendar } from "@/components/sections/Calendar";
import { MonthlyMembers } from "@/components/sections/SideSection/MonthlyMembers";
import { PopularTags } from "@/components/sections/SideSection/PopularTags";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { MOCK_MEMBERS, MOCK_TAGS } from "@/constants/mockData";
import { ImageBanner } from "@/components/layout/ImageBanner";
import { SeriesSection } from "@/components/sections/SeriesSection";
import { SERIES_LIST } from "@/constants/seriesData";
import { X } from "lucide-react";

const Modal = ({
                   isOpen,
                   onClose,
                   children
               }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[80vh] mx-4 overflow-auto">
                {children}
            </div>
        </div>
    );
};

const NoticeModal = ({
                         isOpen,
                         onClose
                     }: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const notices = [
        {
            date: '12월 21일',
            title: '풍향고',
            image: '/images/punghyanggo.webp'
        },
        {
            date: '12월 22일',
            title: '시상식',
            image: '/images/award2_guide.webp'
        }
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">공지사항</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notices.map((notice, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-center">{notice.date}</h3>
                                <p className="text-gray-600 text-center">{notice.title}</p>
                            </div>
                            <img
                                src={notice.image}
                                alt={notice.title}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default function Home() {
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

    useEffect(() => {
        // setIsNoticeModalOpen(true);
    }, []);

    return (
        <div className="w-full overflow-hidden">
            <ImageBanner />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <SeriesSection series={SERIES_LIST}/>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-10">
                    <div>
                        {/* API 연동된 CommunitySection - props 변경 */}
                        <CommunitySection limit={3} showTitle={true} />
                    </div>

                    <div className="space-y-6">
                        <ScheduleCalendar />
                        <MonthlyMembers members={MOCK_MEMBERS} />
                        <PopularTags tags={MOCK_TAGS} />
                    </div>
                </div>
            </div>

            <NoticeModal
                isOpen={isNoticeModalOpen}
                onClose={() => setIsNoticeModalOpen(false)}
            />
        </div>
    );
}