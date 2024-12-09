'use client';

import { Mail, Send } from 'lucide-react';

export const ContactSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                협업/제휴 문의
            </h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">회사/브랜드명</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">이메일</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">문의 내용</label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                    <span>문의하기</span>
                    <Send className="h-4 w-4" />
                </button>
            </form>
        </div>
    );
};