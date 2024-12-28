// components/award/AwardGrid.tsx
'use client';

import {Award} from "@/types/award";

interface AwardGridProps {
    items: Award[];
    onEdit: (id: string) => void;
}

export function AwardGrid({ items, onEdit }: AwardGridProps) {
    const typeLabels = {
        single: '단일 수상',
        multiple: '다수 수상',
        special: '특별상',
    };

    return (
        <div className="grid gap-4">
            {items.map((award) => (
                <div key={award.title} className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div>
                        <h3 className="font-semibold">{award.title}</h3>
                        <span className={`px-2 py-1 text-sm rounded-full ${
                            award.type === 'single' ? 'bg-emerald-100' :
                                award.type === 'multiple' ? 'bg-blue-100' : 'bg-amber-100'
                        }`}>
              {typeLabels[award.type]}
            </span>
                    </div>
                    <button onClick={() => onEdit(award.title)} className="text-blue-600">
                        수정
                    </button>
                </div>
            ))}
        </div>
    );
}