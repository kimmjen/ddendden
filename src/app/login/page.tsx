'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/store/useAuthStore";

interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: 'user' | 'admin' | 'superAdmin';
    createdAt: string;
    permissions?: string[];
}

interface FormData {
    email: string;
    password: string;
}

const DEMO_ACCOUNTS = {
    user: {
        email: "user@example.com",
        password: "user123",
    },
    admin: {
        email: "admin@ddeunddeun.com",
        password: "admin123",
    },
    superAdmin: {
        email: "super@ddeunddeun.com",
        password: "super123",
    }
};

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleQuickLogin = async (accountType: keyof typeof DEMO_ACCOUNTS) => {
        setIsLoading(true);
        setError('');

        try {
            const credentials = DEMO_ACCOUNTS[accountType];
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '로그인에 실패했습니다.');
            }

            const data = await response.json();

            if (data.success) {
                login(data.user);
                redirectBasedOnUserType(data.user.role);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '로그인에 실패했습니다.');
            }

            const data = await response.json();

            if (data.success) {
                login(data.user);
                redirectBasedOnUserType(data.user.role);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const redirectBasedOnUserType = (role: User['role']) => {
        const routes = {
            superAdmin: '/admin-super',
            admin: '/admin',
            user: '/'
        };
        router.push(routes[role]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-[400px] p-8 bg-white rounded-lg shadow-md">
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
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">비밀번호</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#ff6b6b] text-white py-2 rounded mt-4 hover:bg-[#ff5252] transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="text-center text-sm text-gray-500 mb-4">또는 테스트 계정으로 로그인</div>
                    <div className="space-y-2">
                        <button
                            onClick={() => handleQuickLogin('user')}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            일반 사용자로 로그인
                        </button>
                        <button
                            onClick={() => handleQuickLogin('admin')}
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            관리자로 로그인
                        </button>
                        <button
                            onClick={() => handleQuickLogin('superAdmin')}
                            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                        >
                            최고관리자로 로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}