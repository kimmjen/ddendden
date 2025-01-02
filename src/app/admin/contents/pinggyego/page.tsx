'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

type Content = {
    id: number;
    title: string;
    createdAt: string;
    status: 'published' | 'draft';
}

export default function PinggyegoPage() {
    const router = useRouter()
    const [contents, setContents] = useState<Content[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchContents = async () => {
            setIsLoading(true)
            try {
                // API 호출 로직
                // const response = await fetch(`/api/contents?page=${currentPage}&status=${statusFilter}&search=${searchTerm}`)
                // const data = await response.json()
                // setContents(data.contents)
                // setTotalPages(data.totalPages)
            } catch (error) {
                console.error('콘텐츠 로딩 실패:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchContents()
    }, [currentPage, statusFilter, searchTerm])

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* 헤더 섹션 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">핑계고 콘텐츠 관리</h1>
                        <p className="text-gray-600 mt-1">총 {contents.length}개의 콘텐츠가 있습니다</p>
                    </div>
                    <button
                        onClick={() => router.push('/admin/contents/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        새 콘텐츠 작성
                    </button>
                </div>

                {/* 필터/검색 섹션 */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="제목으로 검색..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={handleStatusChange}
                                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            >
                                <option value="all">모든 상태</option>
                                <option value="published">게시됨</option>
                                <option value="draft">임시저장</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 콘텐츠 테이블 */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">제목</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">작성일</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">상태</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">작업</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                                            <span className="text-gray-500">로딩 중...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : contents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        콘텐츠가 없습니다
                                    </td>
                                </tr>
                            ) : (
                                contents.map(content => (
                                    <tr key={content.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600">{content.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{content.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{content.createdAt}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1
                                                    ${content.status === 'published'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-amber-100 text-amber-700'}`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        content.status === 'published' ? 'bg-green-500' : 'bg-amber-500'
                                                    }`} />
                                                    {content.status === 'published' ? '게시됨' : '임시저장'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => router.push(`/admin/contents/${content.id}/edit`)}
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(content.id)}
                                                    className="text-red-600 hover:text-red-800 p-1 rounded-lg hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`min-w-[2.5rem] h-10 rounded-lg font-medium transition-colors
                                ${currentPage === i + 1
                                ? 'bg-purple-600 text-white'
                                : 'border border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}