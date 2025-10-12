'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { appConfig } from "@/config/app.config";
//@ts-expect-error : libError
import ReCAPTCHA from "react-google-recaptcha";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function LoginForm() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [reToken, setReToken] = useState<string | null>(null);
    const [fingerPrint, setFingerPrint] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = sanitizeRedirect(searchParams.get("redirect") || appConfig.mainPage);

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

    async function onSubmit() {
        if (!login || !password) {
            toast.error("Укажите логин и пароль");
            return;
        }

        if (!reToken) {
            toast.error("Подтвердите, что вы не робот 🧠🤖");
            return;
        }

        if (!fingerPrint) {
            toast.error("Ошибка определения устройства. Попробуйте снова.");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login,
                    password,
                    reToken,
                    fingerPrint,
                }),
            });

            if (!res.ok) throw new Error("Неверный логин или пароль");

            toast.success("Вход успешен 🚀");
            router.push(redirect);
        } catch (err: any) {

            toast.error(err.message || "Ошибка входа");
        }
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
                                    <ReCAPTCHA
                                        sitekey={appConfig.reCaptchaToken}
                                        onChange={(token: string) => setReToken(token)}
                                    />
                                </motion.div>

                                <Button type="submit" className="w-full mt-4 transition-transform">
                                    Войти
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
