'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignupForm() {
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    function onSubmit(e?: React.FormEvent) {
        e?.preventDefault();

        if (!login || !password || !confirmPassword) {
            toast.error("Все поля обязательны для заполнения");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Пароли не совпадают");
            return;
        }

        toast.success("Аккаунт создан!");
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
                        <CardTitle>Создание аккаунта</CardTitle>
                        <CardDescription>
                            Придумайте логин и пароль для нового аккаунта
                        </CardDescription>
                        <CardAction>
                            <Link href="/login">
                                <Button variant="link" className="hover:underline">Войти</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={onSubmit} className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="grid gap-2"
                            >
                                <Label htmlFor="email">Логин</Label>
                                <Input
                                    id="email"
                                    type="email"
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
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid gap-2"
                            >
                                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex-col gap-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="w-full"
                        >
                            <Button
                                onClick={onSubmit}
                                type="submit"
                                className="w-full  transition-transform"
                            >
                                Создать
                            </Button>
                        </motion.div>
                        <Label className="text-xs underline text-center">
                            Нажимая создать, вы принимаете условия лицензии
                        </Label>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
