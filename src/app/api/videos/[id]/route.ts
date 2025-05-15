import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
    try {
        // URL에서 id 파라미터 추출
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];
        
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/videos_all.json', 'utf8');
        const videos = JSON.parse(fileContents);
        
        const currentIndex = videos.findIndex((v: any) => v.video_id === id);

        if (currentIndex === -1) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const video = videos[currentIndex];
        const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
        const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

        return NextResponse.json({
            video,
            prevVideo: prevVideo ? {
                video_id: prevVideo.video_id,
                title: prevVideo.title,
                thumbnail_urls: {
                    medium: prevVideo.thumbnail_urls.medium
                }
            } : null,
            nextVideo: nextVideo ? {
                video_id: nextVideo.video_id,
                title: nextVideo.title,
                thumbnail_urls: {
                    medium: nextVideo.thumbnail_urls.medium
                }
            } : null
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch video' },
            { status: 500 }
        );
    }
}