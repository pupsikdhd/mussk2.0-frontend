
import { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import MFAForm from "@/app/login/mfa/MFAForm";

export const metadata: Metadata = {
    title: 'Двухфакторная аутентификация',
    description: 'MUSSK2.0',
};

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function MFAPage({ searchParams }: PageProps) {
    const redirectUrl = searchParams.redirect
        ? (Array.isArray(searchParams.redirect) ? searchParams.redirect[0] : searchParams.redirect)
        : appConfig.mainPage;


    return <MFAForm RedirectUrl={redirectUrl} />;
}