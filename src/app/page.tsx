"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Sparkles, Rocket, Key } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500">

            {/* Логотип */}
            <motion.img
                src="/logo.png"
                width={80}
                height={80}
                alt="logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6 drop-shadow-lg"
            />

            {/* Заголовок */}
            <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-center text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                MUSSK Technologies
            </motion.h1>

            {/* Подзаголовок */}
            <motion.p
                className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-200 text-center max-w-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                Мы разрабатываем цифровые продукты и сервисы для компаний и людей по всему миру.
                Наш фокус — надёжность, скорость и инновации.
            </motion.p>

            {/* Преимущества */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.3 } },
                }}
            >
                <motion.div
                    className="p-8 rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center text-center hover:scale-105 transition
                    bg-white/70 dark:bg-white/10"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                >
                    <Shield className="w-12 h-12 text-green-500 dark:text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Надёжная защита</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Современные технологии шифрования и аудит безопасности на всех этапах.
                    </p>
                </motion.div>

                <motion.div
                    className="p-8 rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center text-center hover:scale-105 transition
                    bg-white/70 dark:bg-white/10"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                >
                    <Zap className="w-12 h-12 text-yellow-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Высокая скорость</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Наши решения масштабируются и выдерживают высокую нагрузку без задержек.
                    </p>
                </motion.div>

                <motion.div
                    className="p-8 rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center text-center hover:scale-105 transition
                    bg-white/70 dark:bg-white/10"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                >
                    <Sparkles className="w-12 h-12 text-pink-600 dark:text-pink-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Инновации</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Постоянный R&D и внедрение новых технологий в продукты клиентов.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                className="flex gap-6 mt-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
            >
                <Link href="/signup">
                    <Button size="lg" className="rounded-xl shadow-lg">
                        <Rocket className="mr-2" /> Начать
                    </Button>
                </Link>
                <Link href="/login">
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-xl border-gray-700 text-gray-900 dark:border-white dark:text-white"
                    >
                        <Key className="mr-2" /> Войти в кабинет
                    </Button>
                </Link>
            </motion.div>

            {/* Футер */}
            <footer className="mt-24 text-center text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} MUSSK CORP. Все права - права.
            </footer>
        </div>
    );
}
