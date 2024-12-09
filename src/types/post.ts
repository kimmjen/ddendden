export interface Post {
    id: number;
    author: {
        name: string;
        avatar?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
    tags?: string[];
}