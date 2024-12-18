'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Content = {
    id: number;
    title: string;
    createdAt: string;
    status: 'published' | 'draft';
}

export default function ContentsManagementPage() {
    const router = useRouter()
    const [contents, setContents] = useState<Content[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // 데이터 불러오기
    useEffect(() => {
        // API 호출
        const fetchContents = async () => {
            try {
                // API 호출 로직
                // const response = await fetch(`/api/contents?page=${currentPage}&status=${statusFilter}&search=${searchTerm}`)
                // const data = await response.json()
                // setContents(data.contents)
                // setTotalPages(data.totalPages)
            } catch (error) {
                console.error('콘텐츠 로딩 실패:', error)
            }
        }

        fetchContents()
    }, [currentPage, statusFilter, searchTerm])

    // 삭제 처리
    const handleDelete = async (id: number) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                // await fetch(`/api/contents/${id}`, { method: 'DELETE' })
                setContents(contents.filter(content => content.id !== id))
            } catch (error) {
                console.error('삭제 실패:', error)
            }
        }
    }

    // 검색 처리
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) // 검색 시 첫 페이지로 이동
    }

    // 상태 필터 처리
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">콘텐츠 관리</h1>
                <button
                    onClick={() => router.push('/admin/contents/new')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    새 콘텐츠 작성
                </button>
            </div>

            {/* 필터/검색 섹션 */}
            <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-sm">
                <input
                    type="search"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-lg flex-grow"
                />
                <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="all">전체</option>
                    <option value="published">게시됨</option>
                    <option value="draft">임시저장</option>
                </select>
            </div>

            {/* 콘텐츠 목록 테이블 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">제목</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">작성일</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">작업</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {contents.map(content => (
                        <tr key={content.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{content.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{content.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{content.createdAt}</td>
                            <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full 
                                        ${content.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        {content.status === 'published' ? '게시됨' : '임시저장'}
                                    </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/contents/${content.id}/edit`)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(content.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg 
                            ${currentPage === i + 1
                            ? 'bg-purple-600 text-white'
                            : 'border hover:bg-gray-50'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    )
}