import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, fallbackLng } from './src/i18n/settings'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(`/${fallbackLng}${pathname}`, request.url)
        )
    }

    // 관리자 경로 체크
    const isAdminPath = pathname.startsWith('/admin')
    const isSuperAdminPath = pathname.startsWith('/admin-super')

    // 관리자 페이지 접근시 권한 체크
    if (isAdminPath || isSuperAdminPath) {
        // 세션이나 토큰에서 사용자 권한 확인
        const userRole = request.cookies.get('user_role')?.value // 예시입니다. 실제 구현에 맞게 수정 필요

        // 권한이 없는 경우
        if (!userRole) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // 슈퍼 관리자 페이지 접근 제한
        if (isSuperAdminPath && userRole !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}