'use client'

import {JetBrains_Mono} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import {Bounce, ToastContainer} from "react-toastify";
import {useTheme} from "next-themes";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {appConfig} from "@/config/app.config";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const jetMono =  JetBrains_Mono({
});


export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
    const { theme} = useTheme()
    console.log(theme);


    const queryClient = new QueryClient()
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
<QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={appConfig.oauth2Token}>
          {children}
          </GoogleOAuthProvider>
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={"dark"}
              transition={Bounce}
          />
</QueryClientProvider>
      </ThemeProvider>


      </body>
    </html>
  );
}
