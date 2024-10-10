import { getUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, response: NextResponse) {
  const { user } = await getUser();
  if (user) {
    return NextResponse.json(user.user_email, { status: 200 });
  }
  return NextResponse.json(user, { status: 200 });
}
