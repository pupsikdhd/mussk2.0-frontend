'use client'
import { useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { appConfig } from "@/config/app.config";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { useMutation } from '@tanstack/react-query';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";





interface Props {
    RedirectUrl?: string;
}


export default function MFAForm({RedirectUrl}: Props) {
    const [mfaCode, setMfaCode] = useState<string>();
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
            if (!mfaCode) throw new Error("Укажите код");
            if (!fingerPrint) throw new Error("Ошибка определения устройства. Попробуйте снова.");

            const res = await fetch("/api/mfa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mfaCode,
                    fingerPrint
                }),
            });

            return res.json();
        },
        onSuccess: () => {
            toast.success("Вход успешен 🚀");
            router.push(redirect);
        },
        onError: (err) => {
            toast.error(err.message || "Ошибка входа");
        },
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
                        <CardTitle>2FA</CardTitle>
                        <CardDescription>
                            Введите код двухфакторной аутентификации
                        </CardDescription>
                        <CardAction>
                            <Link href={`/login?redirect=${redirect}`} onClick={() => {localStorage.removeItem("challenge")}}>
                                <Button variant="link" className="hover:underline">Назад</Button>
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

                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={setMfaCode} value={mfaCode} >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                <Button
                                    type="submit"
                                    className="w-full mt-4 transition-transform"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "Вход..." : "Продолжить"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}