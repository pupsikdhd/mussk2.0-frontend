'use client'
import { Post } from "@/types/Post.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Heart, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import ShareModal from "@/components/custom/share-modal";
import {useState} from "react";
import AuthorCard from "@/components/custom/post/AuthorCard";
import {appConfig} from "@/config/app.config";

interface Props {
    post: Post;
}

export default function PostComponent({ post }: Props) {
    const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: ru,
    });
    const [open, setOpen] = useState(false);
    return (
        <Card className="w-full max-w-2xl mx-auto p-4 rounded-2xl shadow-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-white/20 transition hover:shadow-xl">
            <CardContent className="flex flex-col gap-4">



                <AuthorCard author={post.auhtor}/>

                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <p className="text-sm">{post.description}</p>
                </div>
                <h1 className="text-sm text-muted-foreground">{formattedDate}</h1>
                {/* Действия */}
                <div className="flex justify-between items-center pt-2 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart className="w-4 h-4"/> {post.likesCount ?? 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <img height="16" width="16" src="/comment-icon.png"/>{post.commentsCount ?? 0}
                    </Button>

                    <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setOpen(true)}>Поделиться <Share2 className="w-4 h-4"/></Button>
                    <ShareModal
                        url={appConfig.appDomain+"/app/"+ post.id}
                        open={open}
                        onClose={() => setOpen(false)}
                    />

                </div>
            </CardContent>
        </Card>
    );
}
