import {NextResponse} from "next/server";
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
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ message: "Invalid credentials", details: errorText }, { status: 401 });
        }

        const data = await res.json();

        const token = data.token;
        if (!token) {
            return NextResponse.json({ message: "No token returned from backend" }, { status: 500 });
        }

        const cookieStore = await cookies();
        cookieStore.set(sessionConfig.cookieName, token, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            maxAge: sessionConfig.maxAge,
            path: "/"
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Login API error:", err);
        return NextResponse.json(
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}
