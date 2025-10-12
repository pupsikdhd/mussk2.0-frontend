import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {sessionConfig} from "@/config/session.config";
import {appConfig} from "@/config/app.config";

export async function GET(req: NextRequest) {

    const cookie = await cookies();
    const token = cookie.get(sessionConfig.cookieName)
    const useragent = req.headers.get("user-agent") || "Unknown";

    if(!token?.value){
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const res = await fetch(appConfig.backend+"/api/account/info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": useragent,
            "SessionId": token?.value
        },
    });
    if (!res.ok) {
        console.log(res);
    }
    if (res.status === 401) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }


    return NextResponse.json({ status: 200 });
}