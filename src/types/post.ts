export interface Post {
    id: number;
    post_id: number;
    author: {
        name: string;
        avatar?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
    tags?: string[];
    vote_count?: string;
    poll_data?: poll_data | null;
    images?: string[]
}

interface poll_data {
    total_votes: string;
    choices: [{
        text: string;
        image_url: string;
        vote_percentage: string;
    }]
}