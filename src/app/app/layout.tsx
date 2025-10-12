'use client'

import { JetBrains_Mono} from "next/font/google";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ThemeProvider} from "@/components/theme/theme-provider";
import AuthChecking from "@/components/custom/Auth/CheckingAuth";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/custom/Sidebar/AppSidebar";


const jetMono =  JetBrains_Mono({
});


export default function RootLayout({

                                       children,
                                   }: Readonly<{
    children: React.ReactNode;

}>) {
    const {theme} = useTheme()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)

    console.log(theme);

    useEffect(() => {
        fetch("/api/validate", {
            method: "GET",
        }).then(res => {
            if(res.status === 401){
            router.push("/login");
            return;
            }
            setLoading(false);
        })
    }, []);



    return (

        <html lang="ru" suppressHydrationWarning>
        <body
            className={`${jetMono.className}  antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >


            <SidebarProvider>
                <AppSidebar/>

                        <main className="relative flex-1 overflow-auto min-h-screen px-4 py-10 sm:px-6 font-geist">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 opacity-10"/>
                                <div className="absolute inset-0" />
                            </div>

                            <div className="relative z-10">
                                <SidebarTrigger />
                                {loading ? <AuthChecking /> : children}
                            </div>
                        </main>

            </SidebarProvider>



        </ThemeProvider>
        </body>
        </html>
    );
}
