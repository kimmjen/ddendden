// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {useAuthStore} from "@/store/useAuthStore";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    // app/login/page.tsx
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Zustand store에 사용자 정보 저장
                login(data.user);

                // 사용자 타입에 따른 리다이렉트
                switch(data.user.type) {
                    case 'superAdmin':
                        router.push('/admin-super');
                        break;
                    case 'admin':
                        router.push('/admin');
                        break;
                    default:
                        router.push('/');
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('로그인 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[400px] p-8">
                <h2 className="text-2xl font-bold mb-8 text-center">로그인</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">이메일</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">비밀번호</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#ff6b6b] text-white py-2 rounded mt-4"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}