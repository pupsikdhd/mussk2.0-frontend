'use client';

import {
    Home,
    Settings,
    LogOut,
    User,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {ModeToggle} from "@/components/theme/theme-toggle";

const navItems = [
    { title: "Главная", url: "/app", icon: Home },
];

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeUrl, setActiveUrl] = useState(pathname);

    useEffect(() => {
        setActiveUrl(pathname);
    }, [pathname]);

    const isActive = (url: string) => activeUrl === url;

    const handleNavigate = (url: string) => {
        router.push(url);
        setActiveUrl(url);
    };

    return (
        <Sidebar
            className="
        backdrop-blur-xl backdrop-saturate-150
        shadow-2xl border-r border-gray-800
        min-h-screen flex flex-col justify-between
        transition-all duration-300
        hover:min-w-[280px] min-w-[250px]
      "
            style={{ minWidth: 250 }}
        >
            <SidebarContent className="flex flex-col justify-between h-full px-4 py-6">
                <div>
                    <SidebarGroup>
                        <SidebarGroupLabel className="flex  mb-6 select-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <ModeToggle />
                            </motion.div>
                        </SidebarGroupLabel>

                        <SidebarGroupContent className="space-y-3">

                            <SidebarMenu>
                                {navItems.map((item) => {
                                    const active = isActive(item.url);
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <button
                                                    onClick={() => handleNavigate(item.url)}
                                                    aria-current={active ? "page" : undefined}
                                                    className={`
                                                                flex items-center gap-4 w-full px-5 py-3 rounded-xl text-sm font-semibold
                                                                transition-all duration-300
                                    
                                                                focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500
                                                              `}
                                                    title={item.title}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                    />
                                                    <span className="select-none">{item.title}</span>
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>

                <div className="border-t border-gray-700 pt-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="

                  w-full justify-start px-5 py-3 gap-3 text-sm font-semibold
                   hover:scale-101 transition-transform duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700
                  select-none
                  flex items-center
                "
                                aria-label="Меню аккаунта"
                            >
                                <User className="w-6 h-6 text-cyan-100" />
                                <span>Аккаунт</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className=" w-56 border border-gray-700 shadow-xl rounded-lg py-2">
                            <DropdownMenuItem
                                onClick={() => router.push("/my")}
                                className=" flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer"
                            >
                                <User className="h-5 w-5" />
                                Профиль
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => router.push("/app/settings")}
                                className=" flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer"
                            >
                                <Settings className="h-5 w-5" />
                                Настройки
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => router.push("/app/account/logout")}
                                className=" flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer text-red-400"
                            >
                                <LogOut className="h-5 w-5" />
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
