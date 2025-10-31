import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionConfig } from "@/config/session.config";
import { appConfig } from "@/config/app.config";

export async function POST(req: Request) {
    try {
        const origin = req.headers.get("origin") || req.headers.get("referer");
        const allowed = appConfig.appDomain;
        const useragent = req.headers.get("user-agent") || "Unknown";

        if (!origin || new URL(origin).origin !== allowed) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();

        const res = await fetch(`${appConfig.backend}/api/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": useragent,
            },
            body: JSON.stringify({
                login: body.login,
                password: body.password,
                captchaToken: body.CaptchaToken,
                fingerPrint: body.fingerPrint,
            }),
        });

        const data = await res.json();



        if (data.message === "MFA") {
            console.log("MFA")
            return NextResponse.json({ mfa: true, challenge: data.token });

        }

        if (!data.token) {
            return NextResponse.json({ message: data.message || "Ошибка входа" }, { status: 401 });
        }

        const cookieStore = await cookies();
        cookieStore.set(sessionConfig.cookieName, data.token, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            maxAge: sessionConfig.maxAge,
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error("Login API error:", err);
        return NextResponse.json(
            //@ts-expect-error try-catch
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}
