"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuthChecking() {
    const phrases = [
        "Проверяем ваши сессии...",
        "Синхронизируем данные...",
        "Подключаемся к серверу...",
        "Проверяем ключи доступа...",
        "Загружаем профиль...",
        "Опрашиваем систему безопасности...",
        "Магия авторизации в действии...",
        "Уточняем, кто вы 😏...",
        "Секундочку, почти готово...",
    ];

    const [phrase, setPhrase] = useState("");

    useEffect(() => {
        setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 flex flex-col items-center justify-center
                       bg-white dark:bg-black/90 backdrop-blur-md
                       text-black dark:text-white z-50 transition-colors duration-300"
        >
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-16 h-16 border-4
                           border-black/20 dark:border-white/30
                           border-t-black dark:border-t-white
                           rounded-full mb-6"
            />

            <motion.h2
                key={phrase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg tracking-widest uppercase
                           text-black/70 dark:text-white/70 text-center select-none"
            >
                {phrase}
            </motion.h2>
        </motion.div>
    );
}
