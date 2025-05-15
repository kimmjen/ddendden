export interface Post {
    id: number;
    post_id: number;
    author: {
        id?: number;
        name: string;
        avatar?: string;
    };
    title?: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    likes: number;
    comments: number;
    tags?: string[];
    vote_count?: string;
    poll_data?: PollData | null;
    images?: string[];
    is_pinned?: boolean;
}

export interface PollData {
    total_votes: string;
    choices: PollChoice[];
}

export interface PollChoice {
    text: string;
    image_url?: string;
    vote_percentage: string;
}

export interface Comment {
    id: number;
    post_id: number;
    author: {
        id: number;
        name: string;
        avatar?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
}

export interface PostsResponse {
    data: Post[];
    total_pages: number;
    total_items: number;
    current_page: number;
}

export interface CommentsResponse {
    data: Comment[];
    total: number;
}