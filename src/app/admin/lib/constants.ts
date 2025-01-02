export const MENU_ITEMS = [
    { path: '/admin', label: '대시보드', icon: '📊' },
    {
        path: '/admin/contents',
        label: '콘텐츠 관리',
        icon: '📝',
        subItems: [
            { path: '/admin/contents/pinggyego', label: '핑계고' },
            { path: '/admin/contents/mini-pinggyego', label: '미니 핑계고' },
            { path: '/admin/contents/punghyanggo', label: '풍향고' },
            { path: '/admin/contents/monthly', label: '이달의 계원' },
        ],
    },
    { path: '/admin/posts', label: '게시글 관리', icon: '📝' },
    { path: '/admin/users', label: '사용자 관리', icon: '👥' },
    { path: '/admin/awards', label: '시상식 관리', icon: '🏆' },
]