
import { Post } from "@/types/Post.type";
import PostComponent from "@/components/custom/post/postComponent";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Главная',
    description: 'MUSSK2.0',
}

export default function MainPage() {
    // Тестовые посты
    const posts: Post[] = [
        {
            id: "1",
            title: "Первый пост 🚀",
            description: "Это тестовый пост для проверки компонента.",
            auhtor: {
                id: "u1",
                name: "Иван Петров",
                avatar: "https://i.pravatar.cc/1544?img=3",
                username: "ivanpetrov",
            },
            createdAt : "2025-05-31 00:47:39.916066+07",
            likesCount: 12,
            commentsCount: 3,
        },
        {
            id: "2",
            title: "Фронтенд vs Бэкенд ⚔️",
            description:
                "Кто сильнее? Фронтендер с React или бэкендер с .NET? Пишите в комментах!",
            auhtor: {
                id: "u2",
                name: "Алиса Котова",
                avatar: "https://i.pravatar.cc/150?img=5",
                username: "alisak",
            },
            createdAt : "2025-08-31 00:59:39.916066+07",
            likesCount: 34,
            commentsCount: 15,
        },
        {
            id: "3",
            title: "Пидорасы",
            description: "А вот америке там всё хуёво!",
            auhtor: {
                id: "u3",
                name: "Ваня CBO",
                avatar: "https://i.pravatar.cc/150?img=8",
                username: "CBO",
            },
            createdAt : "2025-08-31 00:59:38.575181+07",
            likesCount: 99,
            commentsCount: 21,
        },
    ];

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {posts.map((post) => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
}
