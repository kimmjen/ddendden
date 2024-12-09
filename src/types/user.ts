export type UserType = 'user' | 'admin' | 'superAdmin';

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    type: UserType;
    role: string;
    createdAt: string;
}