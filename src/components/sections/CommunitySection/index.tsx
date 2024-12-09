import { Post } from '@/types/post';
import { PostCard } from './PostCard';

interface CommunitySectionProps {
    posts: Post[];
}

export const CommunitySection = ({ posts }: CommunitySectionProps) => {
    return (
        <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    글쓰기
                </button>
            </div>

            <div className="space-y-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};