import LoginForm from "@/app/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Вход',
    description: 'MUSSK2.0',
}

export default function LoginPage(){
    return (<><LoginForm /></>);
}