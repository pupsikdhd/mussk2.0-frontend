"use client";

import { Profile } from "@/types/Profile.type";
import FriendCard from "@/components/custom/Friends/FriendCard";
import { JSX } from "react";
import { motion } from "framer-motion";

interface Props {
    profile: Profile;
}

export default function ProfileComponent({ profile }: Props): JSX.Element {
    return (
        <div className="flex flex-col items-center gap-8 p-6 max-w-3xl mx-auto">
            {/* Основная карточка профиля */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dark:bg-white/10 bg-gray-100 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-full text-center border border-white/20"
            >
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-32 h-32 rounded-full border-4 border-white/30 shadow-md object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white">{profile.name}</h1>
                        <h3 className="dark:text-gray-300 text-gray-500">{profile.username}</h3>
                    </div>
                    {profile.description && (
                        <p className="mt-3 dark:text-gray-200 max-w-md">{profile.description}</p>
                    )}
                </div>
            </motion.div>

            {profile.friends?.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"
                >
                    {profile.friends.map((p) => (
                        <FriendCard profile={p} key={p.id} />
                    ))}
                </motion.div>
            ) : (
                <p className="text-gray-400 italic">Пока нет друзей 😢</p>
            )}
        </div>
    );
}
