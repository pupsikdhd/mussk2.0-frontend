import {MiniProfile} from "@/types/Profile.type";

export interface Post {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    auhtor : MiniProfile
    likesCount: number;
    commentsCount: number;
}