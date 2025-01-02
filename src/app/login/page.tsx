'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, Lock, User, Shield, ShieldAlert } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
            <div className="w-full max-w-md p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 transition-all">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">환영합니다 👋</h1>
                        <p className="text-gray-600">계정 정보를 입력하여 로그인해주세요</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="이메일을 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="비밀번호를 입력하세요"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">테스트 계정으로 로그인</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button
                                onClick={() => handleQuickLogin('user')}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
                            >
                                <User className="h-5 w-5" />
                                일반 사용자로 로그인
                            </button>
                            <button
                                onClick={() => handleQuickLogin('admin')}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
                            >
                                <Shield className="h-5 w-5" />
                                관리자로 로그인
                            </button>
                            {/*<button*/}
                            {/*    onClick={() => handleQuickLogin('superAdmin')}*/}
                            {/*    disabled={isLoading}*/}
                            {/*    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"*/}
                            {/*>*/}
                            {/*    <ShieldAlert className="h-5 w-5" />*/}
                            {/*    최고관리자로 로그인*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}