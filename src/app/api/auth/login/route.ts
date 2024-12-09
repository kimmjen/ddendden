// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {User} from "@/types/user";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Mock 데이터 읽기
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
        const { users, admins, superAdmin } = JSON.parse(fileContents);

        // 각 사용자 타입별 확인
        const normalUser = users.find((u: User) => u.email === email && u.password === password);
        const adminUser = admins.find((a: User) => a.email === email && a.password === password);
        const isSuperAdmin = superAdmin.email === email && superAdmin.password === password;

        let userData = null;

        if (normalUser) {
            userData = { ...normalUser, type: 'user' };
        } else if (adminUser) {
            userData = { ...adminUser, type: 'admin' };
        } else if (isSuperAdmin) {
            userData = { ...superAdmin, type: 'superAdmin' };
        }

        if (userData) {
            // 비밀번호는 제외하고 반환
            const { password, ...userWithoutPassword } = userData;
            return NextResponse.json({
                success: true,
                user: userWithoutPassword
            });
        }

        return NextResponse.json({
            success: false,
            message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        }, { status: 401 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: '로그인 처리 중 오류가 발생했습니다.'
        }, { status: 500 });
    }
}