"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-400"
            >
                Страница не найдена
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6"
            >
                <Link href="/">
                    <Button variant="outline" className="px-6 py-2 text-sm">
                        На главную
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
