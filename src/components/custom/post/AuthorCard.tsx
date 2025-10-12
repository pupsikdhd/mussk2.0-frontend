'use client'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {MiniProfile} from "@/types/Profile.type";
import {JSX} from "react";

interface Props {
    author: MiniProfile;
}

export default function AuthorCard({author}: Props): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={author.avatar} alt={author.name}/>
                <AvatarFallback>
                    {author.name?.[0]?.toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-semibold text-lg">{author.name}</h2>
                <Link href={`/app/@${author.username}`}>
                    <p className="text-xs text-muted-foreground hover:underline cursor-pointer">
                        {author.username ?? "user"}
                    </p>
                </Link>
            </div>
        </div>
    );
}