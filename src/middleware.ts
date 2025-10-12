import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {cookies} from "next/headers";
import {sessionConfig} from "@/config/session.config";

export async function middleware(req: NextRequest) {
    const ua = req.headers.get("user-agent") || "";
    const url = req.nextUrl.clone();
    if (req.nextUrl.pathname === "/notsupport.html") {
        return NextResponse.next();
    }

    if (/MSIE|Trident/i.test(ua)) {
        return NextResponse.redirect(new URL("/notsupport.html", req.url));
    }

    const token= req.cookies.get(sessionConfig.cookieName);

    if(token && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/app", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/app")) {

        if (!token || token?.value.length !== sessionConfig.tokenLength) {
            const cookie = await cookies();

            cookie.delete(sessionConfig.cookieName);
            const redirectUrl = new URL("/login", req.url);
            redirectUrl.searchParams.set("redirect", url.pathname + url.search);
            return NextResponse.redirect(redirectUrl);
        }

    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
