import ProfileComponent from "@/components/custom/Profile/profile";
import {Post} from "@/types/Post.type";
import {MiniProfile, Profile} from "@/types/Profile.type";


interface PageProps {
    params: { username: string };
}



export default function ProfilePage({ params }: PageProps) {

    // Тестовые посты
    const profile: Profile =
        {
            id: "bossin",
            name: "kcas",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            username: "@sraka",
            description: "string",
            friends:[
                {
                    id: "bissin2",
                    name: "bissin2",
                    avatar: "bissin2",
                    username: "@bissin2"
                },
                {
                    id: "bissin3",
                    name: "bissin3",
                    avatar: "bissin3",
                    username: "@bissin3"
                }
            ]
        };

    const username = decodeURIComponent(params.username);

    if (username.startsWith("@")) {
        return <div>Профиль: {username.slice(1)}
            <ProfileComponent profile={profile} />
        </div>;
    }
    else{
        return <div>Ошибка в имени пользователя</div>
    }
}
