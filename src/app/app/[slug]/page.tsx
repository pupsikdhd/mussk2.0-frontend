import {redirect} from "next/navigation";

interface PageProps {
    params: { slug: string };
}

export default function SlugPage({ params }: PageProps) {
    const slug = decodeURIComponent(params.slug);

    if (slug.startsWith("@")) {
        redirect("/app/profile/"+slug);
        return <div>Профиль: {slug.slice(1)}</div>;
    } else {
        return <div>Пост: {slug}</div>;
    }
}
