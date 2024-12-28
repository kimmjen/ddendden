'use client';

import { useState, useEffect } from 'react';
import { Award } from '@/types/award';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import { useAwardStore } from '@/store/useAwardStore';

interface EditAwardFormProps {
    year: number;
    id: number;
    award: Award;
}

export function EditAwardForm({ year, id, award }: EditAwardFormProps) {
    const { loading, fetchAwardById, updateAward } = useAwardStore();
    const [formData, setFormData] = useState<Award | null>(null);


    useEffect(() => {
        if (award) {
            setFormData(award);
        }
    }, [award]);

    const handleFieldChange = (field: string, value: any) => {
        setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleNomineeChange = (index: number, field: string, value: any) => {
        if (!formData) return;
        const updatedNominees = [...(formData.nominees || [])];
        updatedNominees[index] = { ...updatedNominees[index], [field]: value };
        handleFieldChange('nominees', updatedNominees);
    };

    const addNominee = () => {
        handleFieldChange('nominees', [...(formData?.nominees || []), { name: '', works: [''] }]);
    };

    const removeNominee = (index: number) => {
        if (!formData) return;
        const updatedNominees = [...(formData.nominees || [])];
        updatedNominees.splice(index, 1);
        handleFieldChange('nominees', updatedNominees);
    };

    const handleSave = async () => {
        if (!formData) return;
        await updateAward(formData);
        alert('시상이 성공적으로 저장되었습니다.');
        window.location.href = `/admin-super/awards/${year}`;
    };

    if (loading || !formData) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href={`/admin-super/awards/${year}`} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold">{formData.title} 수정</h1>
            </div>

            <form className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium mb-2">시상명</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">영문명</label>
                    <input
                        type="text"
                        value={formData.englishTitle}
                        onChange={(e) => handleFieldChange('englishTitle', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">수상 유형</label>
                    <select
                        value={formData.type}
                        onChange={(e) => handleFieldChange('type', e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="single">단일 수상</option>
                        <option value="multiple">다수 수상</option>
                        <option value="special">특별상</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">수상자 목록</label>
                    {formData.nominees?.map((nominee, index) => (
                        <div key={index} className="flex items-center gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="이름"
                                value={nominee.name}
                                onChange={(e) =>
                                    handleNomineeChange(index, 'name', e.target.value)
                                }
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeNominee(index)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addNominee}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={16} />
                        추가
                    </button>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    );
}
