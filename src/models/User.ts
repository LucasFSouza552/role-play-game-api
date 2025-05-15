export interface user {
    id: string,
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'user';
}