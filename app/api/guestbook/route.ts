import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getServerSession } from "@/lib/auth";

export async function GET() {
  const messages = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();
  if (!message || message.length > 500) return NextResponse.json({ error: "Invalid message" }, { status: 400 });

  const entry = await prisma.guestbookEntry.create({
    data: { message, authorId: session.user.id },
    include: { author: true },
  });
  return NextResponse.json(entry);
}
