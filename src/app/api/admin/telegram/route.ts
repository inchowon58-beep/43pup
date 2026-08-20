import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getTelegramAdminStatus, sendTelegramTestMessage } from "@/lib/telegram";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(getTelegramAdminStatus());
}

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const result = await sendTelegramTestMessage();
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
