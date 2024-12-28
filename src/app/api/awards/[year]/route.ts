import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;

    if (!year) {
        return new Response(JSON.stringify({ error: 'Year is required' }), { status: 400 });
    }
    try {
        const jsonDirectory = path.join(process.cwd(), 'data/award');
        const fileContents = await fs.readFile(path.join(jsonDirectory, `${year}.json`), 'utf8');
        const data = JSON.parse(fileContents);
        if (!Array.isArray(data)) {
            console.warn('데이터가 배열 형식이 아닙니다:', data);
            return NextResponse.json([]);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json([], { status: 500 });
    }
}
