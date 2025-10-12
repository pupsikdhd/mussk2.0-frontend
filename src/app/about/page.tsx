"use client";

import React, {JSX} from "react";
import { motion } from "framer-motion";

const TECHS = [
    "TypeScript", "Next.js", "TailwindCSS", "ASP.NET Core", "Entity Framework", "Redis", "Docker", "Postgres", "SignalR", "gRPC"
];

export default function AboutPage(): JSX.Element {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-[#04040a] dark:to-[#08080f] text-slate-900 dark:text-slate-100">
            {/* Hero */}
            <section className="relative overflow-hidden py-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl sm:text-5xl font-extrabold leading-tight"
                        >
                            Мы создаём продукты, которые работают — красиво и надёжно
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="mt-6 text-lg text-slate-600 dark:text-slate-300"
                        >
                            Наша миссия — строить надёжные системы с человеческим UX, масштабируемой архитектурой и уважением к приватности.
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-8 inline-flex gap-3"
                        >
                            <a href="#values" className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:brightness-105">
                                Наши ценности
                            </a>
                            <a href="#tech" className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200">
                                Технологии
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* decorative gradient circles */}
                <div className="pointer-events-none absolute -right-40 top-8 w-96 h-96 rounded-full bg-gradient-to-br from-violet-400/30 to-indigo-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-28 bottom-10 w-72 h-72 rounded-full bg-gradient-to-br from-amber-300/20 to-pink-300/10 blur-2xl" />
            </section>

            {/* Marquee / Technologies */}
            <section id="tech" className="py-8">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-[#0b0b10] border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 overflow-hidden">
                                <div className="marquee py-2">
                                    <div className="marquee-track flex items-center whitespace-nowrap gap-8">
                                        {Array.from({ length: 3 }).map((_, idx) => (
                                            <React.Fragment key={idx}>
                                                {TECHS.map((t) => (
                                                    <span key={`${t}-${idx}`} className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200">{t}</span>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 text-sm text-slate-500 dark:text-slate-400">Технологии, с которыми мы работаем</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section id="values" className="py-12">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Качество",
                                desc: "Только проверенные решения, тестируемые в боевых условиях. Никаких костылей — только чистая архитектура.",
                                emoji: "🛠️",
                            },
                            {
                                title: "Приватность",
                                desc: "Мы проектируем системы так, чтобы пользователь контролировал свои данные — минимум внешних зависимостей и прозрачная модель хранения.",
                                emoji: "🔒",
                            },
                            {
                                title: "Скорость",
                                desc: "Оптимизированный код, продуманное кэширование и асинхронность — всё для отклика под миллисекунды.",
                                emoji: "⚡",
                            },
                        ].map((v) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-[#061019] border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow"
                            >
                                <div className="text-3xl mb-3">{v.emoji}</div>
                                <h3 className="text-xl font-semibold">{v.title}</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            <style jsx>{`
        .marquee {
          --marquee-speed: 28s;
        }
        .marquee-track {
          display: inline-flex;
          gap: 1.25rem;
          animation: marquee var(--marquee-speed) linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
        </main>
    );
}
