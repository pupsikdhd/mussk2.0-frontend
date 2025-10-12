import { MiniProfile } from "@/types/Profile.type";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    profile: MiniProfile;
}

export default function FriendCard({ profile }: Props) {
    return (
        <Link
            href={`/app/${profile.username}`}
            className="flex items-center gap-3 p-4 rounded-2xl border border-gray-200 transition"
        >
            <Avatar className="w-12 h-12">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
        <span className="font-semibold ">
          {profile.name}
        </span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{profile.username}</span>
            </div>
        </Link>
    );
}
