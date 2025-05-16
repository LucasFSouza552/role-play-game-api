export interface user {
    id: number,
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user';
}