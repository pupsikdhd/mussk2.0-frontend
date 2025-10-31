// src/app/login/page.tsx — Server Component (без 'use client')
import LoginForm from "@/app/login/(login)/LoginForm";
import { Metadata } from "next";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = {
    title: 'Вход',
    description: 'MUSSK2.0',
};

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function LoginPage({ searchParams }: PageProps) {
    const redirectUrl = searchParams.redirect
        ? (Array.isArray(searchParams.redirect) ? searchParams.redirect[0] : searchParams.redirect)
        : appConfig.mainPage;

    return <LoginForm RedirectUrl={redirectUrl} />;
}