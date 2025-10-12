export interface MiniProfile {
    id: string;
    name: string;
    avatar: string;
    username: string;
}

export interface Profile {
    id: string;
    name: string;
    avatar: string;
    username: string;
    description: string;
    friends: MiniProfile[];
}