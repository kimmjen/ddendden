'use client';

import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: '활성' | '비활성';
    joinedAt: string;
}

const usersMockData: User[] = [
    { id: 1, name: '홍길동', email: 'hong@gmail.com', status: '활성', joinedAt: '2024-01-01' },
    { id: 2, name: '김철수', email: 'kim@gmail.com', status: '비활성', joinedAt: '2024-01-02' },
    { id: 3, name: '이영희', email: 'lee@gmail.com', status: '활성', joinedAt: '2024-01-03' },
    { id: 4, name: '박영수', email: 'park@gmail.com', status: '비활성', joinedAt: '2024-01-04' },
    { id: 5, name: '최민호', email: 'choi@gmail.com', status: '활성', joinedAt: '2024-01-05' },
    // ... 더 많은 사용자 데이터
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        // 실제 API 호출로 대체 가능
        setUsers(usersMockData);
    }, []);

    // 검색 필터 적용
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션 처리
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">사용자 관리</h1>

                {/* 검색 필터 */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="사용자 검색 (이름 또는 이메일)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 사용자 목록 테이블 */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">이름</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">이메일</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">가입 날짜</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {paginatedUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${
                                                user.status === '활성'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4">{user.joinedAt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        이전
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 mx-1 border rounded-lg ${
                                currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}
