import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function DELETE() {

    const cookie = await cookies();
    const token = cookie.get("sessionId");
    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    cookie.delete("sessionId")

    return NextResponse.json({ status: 200 });
}