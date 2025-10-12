'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function LogoutPage() {
    const router = useRouter();

    async function onLogout() {
        try {
            const res = await fetch("/api/logout", { method: "DELETE" });
            if (res.ok) {
                toast.success("Вы вышли из аккаунта");
                router.push("/login");
            } else {
                toast.error("Не удалось выйти, попробуйте снова");
            }
        } catch (err) {
            toast.error("Произошла ошибка при выходе");
            console.error(err);
        }
    }

    function detectReferrer() {
        if (!document.referrer || document.referrer === document.location.href) {
            return "/";
        }
        return document.referrer;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className=" p-8 rounded-2xl flex flex-col items-center gap-6"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-semibold text-center"
                >
                    Вы хотите выйти из аккаунта?
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex gap-4 mt-2"
                >
                    <Button
                        onClick={onLogout}
                        className="px-8 py-3 text-lg hover:shadow-lg transition-transform"
                    >
                        Выйти
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push(detectReferrer())}
                        className="px-6 py-3 hover:shadow-lg transition-transform"
                    >
                        Остаться
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
