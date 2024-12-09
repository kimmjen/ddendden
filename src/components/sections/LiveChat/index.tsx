'use client';

import { Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ChatMessage {
    id: number;
    user: string;
    message: string;
    time: string;
}

export const LiveChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, user: "뜬뜬계원_1", message: "오늘 방송 너무 재밌어요!", time: "방금 전" },
        { id: 2, user: "뜬뜬계원_2", message: "다음 핑계고는 언제인가요?", time: "1분 전" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                실시간 채팅
            </h2>
            <div className="h-[300px] mb-4 space-y-4 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className="flex space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">{msg.user}</span>
                                <span className="text-sm text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-gray-700">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                    className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};