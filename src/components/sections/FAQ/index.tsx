'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQs: FAQItem[] = [
    {
        question: "핑계고는 어떤 콘텐츠인가요?",
        answer: "핑계고는 다양한 앱과 제품을 리뷰하고 소개하는 콘텐츠입니다."
    },
    {
        question: "업로드 일정은 어떻게 되나요?",
        answer: "매주 수요일, 토요일에 새로운 영상이 업로드됩니다."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                자주 묻는 질문
            </h2>
            <div className="space-y-4">
                {FAQs.map((faq, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex justify-between items-center py-2"
                        >
                            <span className="font-medium text-left">{faq.question}</span>
                            <ChevronDown className={`h-5 w-5 transform transition-transform ${
                                openIndex === index ? 'rotate-180' : ''
                            }`} />
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-600 mt-2 pl-2">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
