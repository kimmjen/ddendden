'use client';

import { useState, useEffect } from 'react';

interface TranslationItem {
    key: string;
    ko: string;
    en: string;
}

export default function TranslationsPage() {
    const [translations, setTranslations] = useState<TranslationItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItem, setNewItem] = useState<TranslationItem>({
        key: '',
        ko: '',
        en: ''
    });

    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editItem, setEditItem] = useState<TranslationItem | null>(null);

    // 번역 데이터를 평탄화하는 함수
    const flattenTranslations = (obj: any, prefix = ''): TranslationItem[] => {
        let result: TranslationItem[] = [];

        for (const key in obj.en) {
            const currentKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj.en[key] === 'object') {
                result = [...result, ...flattenTranslations(
                    { en: obj.en[key], ko: obj.ko[key] },
                    currentKey
                )];
            } else {
                result.push({
                    key: currentKey,
                    en: obj.en[key],
                    ko: obj.ko[key]
                });
            }
        }

        return result;
    };

    // 평탄화된 데이터를 중첩 객체로 변환하는 함수
    const unflattenTranslations = (items: TranslationItem[]) => {
        const result = {
            en: {},
            ko: {}
        };

        items.forEach(item => {
            const keys = item.key.split('.');
            let currentEnObj = result.en as any;
            let currentKoObj = result.ko as any;

            keys.forEach((k, i) => {
                if (i === keys.length - 1) {
                    currentEnObj[k] = item.en;
                    currentKoObj[k] = item.ko;
                } else {
                    currentEnObj[k] = currentEnObj[k] || {};
                    currentKoObj[k] = currentKoObj[k] || {};
                    currentEnObj = currentEnObj[k];
                    currentKoObj = currentKoObj[k];
                }
            });
        });

        return result;
    };

    // 데이터 로드
    const loadTranslations = async () => {
        try {
            const response = await fetch('/api/translations');
            const data = await response.json();
            setTranslations(flattenTranslations(data));
        } catch (error) {
            console.error('번역 로드 실패:', error);
        }
    };

    useEffect(() => {
        loadTranslations();
    }, []);

    // 새 번역 추가
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTranslations = [...translations, newItem];
        const newData = unflattenTranslations(updatedTranslations);

        try {
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (response.ok) {
                loadTranslations();
                setNewItem({ key: '', ko: '', en: '' });
            }
        } catch (error) {
            console.error('번역 추가 실패:', error);
        }
    };

    // 번역 수정
    const handleUpdate = async (updatedItem: TranslationItem) => {
        const updatedTranslations = translations.map(item =>
            item.key === updatedItem.key ? updatedItem : item
        );

        const newData = unflattenTranslations(updatedTranslations);

        try {
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (response.ok) {
                loadTranslations();
            }
        } catch (error) {
            console.error('번역 수정 실패:', error);
        }
    };

    // 수정 시작
    const handleEditStart = (item: TranslationItem) => {
        setEditingKey(item.key);
        setEditItem({ ...item });
    };

    // 수정 취소
    const handleEditCancel = () => {
        setEditingKey(null);
        setEditItem(null);
    };

    // 수정 저장
    const handleEditSave = async () => {
        if (!editItem) return;

        const updatedTranslations = translations.map(item =>
            item.key === editItem.key ? editItem : item
        );

        const newData = unflattenTranslations(updatedTranslations);

        try {
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (response.ok) {
                loadTranslations();
                setEditingKey(null);
                setEditItem(null);
            }
        } catch (error) {
            console.error('번역 수정 실패:', error);
        }
    };

    // 번역 삭제
    const handleDelete = async (keyToDelete: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        const updatedTranslations = translations.filter(item => item.key !== keyToDelete);
        const newData = unflattenTranslations(updatedTranslations);

        try {
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });

            if (response.ok) {
                loadTranslations();
            }
        } catch (error) {
            console.error('번역 삭제 실패:', error);
        }
    };

    const filteredTranslations = translations.filter(item =>
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ko.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.en.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">번역 관리</h1>

            {/* 검색 */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="검색..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 새 번역 추가 폼 */}
            <form onSubmit={handleAdd} className="mb-8 p-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4">새 번역 추가</h2>
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="키 (예: navigation.home)"
                        className="p-2 border rounded"
                        value={newItem.key}
                        onChange={(e) => setNewItem({...newItem, key: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="한국어"
                        className="p-2 border rounded"
                        value={newItem.ko}
                        onChange={(e) => setNewItem({...newItem, ko: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="영어"
                        className="p-2 border rounded"
                        value={newItem.en}
                        onChange={(e) => setNewItem({...newItem, en: e.target.value})}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    추가
                </button>
            </form>

            {/* 번역 목록 */}
            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="p-3 text-left">키</th>
                        <th className="p-3 text-left">한국어</th>
                        <th className="p-3 text-left">영어</th>
                        <th className="p-3 text-left">작업</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTranslations.map((item) => (
                        <tr key={item.key} className="border-t">
                            <td className="p-3">{item.key}</td>
                            <td className="p-3">
                                {editingKey === item.key ? (
                                    <input
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editItem?.ko || ''}
                                        onChange={(e) => setEditItem(prev =>
                                            prev ? {...prev, ko: e.target.value} : prev
                                        )}
                                    />
                                ) : (
                                    <span>{item.ko}</span>
                                )}
                            </td>
                            <td className="p-3">
                                {editingKey === item.key ? (
                                    <input
                                        type="text"
                                        className="w-full p-1 border rounded"
                                        value={editItem?.en || ''}
                                        onChange={(e) => setEditItem(prev =>
                                            prev ? {...prev, en: e.target.value} : prev
                                        )}
                                    />
                                ) : (
                                    <span>{item.en}</span>
                                )}
                            </td>
                            <td className="p-3">
                                {editingKey === item.key ? (
                                    <div className="space-x-2">
                                        <button
                                            onClick={handleEditSave}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            저장
                                        </button>
                                        <button
                                            onClick={handleEditCancel}
                                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        >
                                            취소
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEditStart(item)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.key)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}