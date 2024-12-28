import { create } from 'zustand';
import { Award } from '@/types/award';

interface AwardStore {
    // State
    awards: Award[];
    selectedYear: string;
    loading: boolean;
    error: string | null;
    currentAward: Award | null;

    // Actions
    setSelectedYear: (year: string) => void;
    fetchAwards: (year: string) => Promise<void>;
    fetchAwardById: (year: number, id: number) => Promise<void>;
    createAward: (award: Award) => Promise<void>;
    updateAward: (award: Award) => Promise<void>;
    deleteAward: (year: number, id: number) => Promise<void>;
    resetCurrentAward: () => void;
}

// 유틸리티 함수: API 요청 처리 및 에러 검증
const fetchWithValidation = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API 요청 실패');
    }
    return response.json();
};

export const useAwardStore = create<AwardStore>((set, get) => ({
    // Initial state
    awards: [],
    selectedYear: '2024',
    loading: false,
    error: null,
    currentAward: null,

    // Actions
    setSelectedYear: (year) => set({ selectedYear: year }),

    fetchAwards: async (year) => {
        if (get().loading) return; // 중복 요청 방지
        set({ loading: true, error: null });
        try {
            const data = await fetchWithValidation<Award[]>(`/api/admin-super/awards/${year}`);
            set({ awards: data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchAwardById: async (year, id) => {
        if (get().loading) return; // 중복 요청 방지
        set({ loading: true, error: null });
        try {
            const award = await fetchWithValidation<Award>(`/api/admin-super/awards/${year}/${id}`);
            set({ currentAward: award, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    createAward: async (award) => {
        if (get().loading) return; // 중복 요청 방지
        set({ loading: true, error: null });
        try {
            await fetchWithValidation(`/api/admin-super/awards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(award),
            });
            await get().fetchAwards(get().selectedYear); // 데이터 새로고침
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    updateAward: async (award) => {
        if (get().loading) return; // 중복 요청 방지
        set({ loading: true, error: null });
        try {
            await fetchWithValidation(`/api/admin-super/awards/${award.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(award),
            });
            await get().fetchAwards(get().selectedYear); // 데이터 새로고침
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    deleteAward: async (year, id) => {
        if (get().loading) return; // 중복 요청 방지
        set({ loading: true, error: null });
        try {
            await fetchWithValidation(`/api/admin-super/awards/${year}/${id}`, {
                method: 'DELETE',
            });
            await get().fetchAwards(String(year)); // 데이터 새로고침
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    resetCurrentAward: () => set({ currentAward: null }),
}));
