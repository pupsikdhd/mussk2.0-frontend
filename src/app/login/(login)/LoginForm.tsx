'use client'
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { appConfig } from "@/config/app.config";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { useMutation } from '@tanstack/react-query';
import TurnstileCaptcha from "@/components/custom/Auth/TurnstileCaptcha";




interface Props {
    RedirectUrl?: string;
}


export default function LoginForm({RedirectUrl}: Props) {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [CaptchaToken, setCaptchaToken] = useState<string | null>(null);
    const [fingerPrint, setFingerPrint] = useState<string | null>(null);
    const router = useRouter();
    const redirect = sanitizeRedirect(RedirectUrl || appConfig.mainPage);



    useEffect(() => {
        const loadFingerPrint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerPrint(result.visitorId);
        };
        loadFingerPrint();


    }, []);




    function sanitizeRedirect(redirect?: string): string {
        if (!redirect) return appConfig.mainPage;

        try {
            const url = new URL(redirect, appConfig.appDomain);
            if (url.origin !== appConfig.appDomain) {
                return appConfig.mainPage;
            }
            return url.pathname + url.search;
        } catch {
            return appConfig.mainPage;
        }
    }


    const loginMutation = useMutation({
        mutationFn: async () => {
            if (!login || !password) throw new Error("Укажите логин и пароль");
            if (!CaptchaToken) throw new Error("Подтвердите, что вы не робот 🧠🤖");
            if (!fingerPrint) throw new Error("Ошибка определения устройства. Попробуйте снова.");

            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login,
                    password,
                    CaptchaToken,
                    fingerPrint
                }),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        if(data.mfa === true && data.challenge){
                            localStorage.setItem("challenge", data.challenge);
                            router.push(`/login/mfa?redirect=${redirect}`);
                        }

                    })
                }

            }).catch((err) => {toast.error(err)});
        }
    });



    function onSubmit() {
        loginMutation.mutate();
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-xs"
                style={{ backgroundImage: "url('/login-background.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 md:p-6"
            >
                <Card className="w-full shadow-lg border border-gray-700">
                    <CardHeader>
                        <CardTitle>Вход</CardTitle>
                        <CardDescription>
                            Введите логин и пароль для входа в аккаунт
                        </CardDescription>
                        <CardAction>
                            <Link href="/signup">
                                <Button variant="link" className="hover:underline">Создать</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                        >
                            <div className="flex flex-col gap-6">
                                {/* ... Поля Логин и Пароль остаются без изменений ... */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="grid gap-2"
                                >
                                    <Label htmlFor="email">Логин</Label>
                                    <Input
                                        id="email"
                                        placeholder="blyadomir"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid gap-2"
                                >
                                    <Label htmlFor="password">Пароль</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex justify-center mt-2"
                                >
                                    <TurnstileCaptcha onChange={setCaptchaToken} className="flex justify-center mt-2" />
                                </motion.div>

                                <Button
                                    type="submit"
                                    className="w-full mt-4 transition-transform"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "Вход..." : "Войти"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}