import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const TRANSLATION_FILE = path.join(process.cwd(), 'public/locales/translation.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(TRANSLATION_FILE, 'utf8');
        return NextResponse.json(JSON.parse(fileContents));
    } catch (error) {
        return NextResponse.json({ error: '번역 데이터 로드 실패' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await fs.writeFile(TRANSLATION_FILE, JSON.stringify(data, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: '번역 데이터 저장 실패' }, { status: 500 });
    }
}