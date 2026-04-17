import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from '@/lib/auth';
import { ReactionSchema } from '@/lib/schemas';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) return NextResponse.json({ error: 'Post ID required' }, { status: 400 });

  const reactions = await prisma.reaction.groupBy({
    by: ['emoji'],
    where: { postId },
    _count: { emoji: true },
  });

  return NextResponse.json(reactions);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const validation = ReactionSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error, { status: 400 });

  const existing = await prisma.reaction.findFirst({
    where: { postId: body.postId, userId: session.user.id, emoji: body.emoji },
  });

  if (existing) {
    await prisma.reaction.delete({ where: { id: existing.id } });
  } else {
    await prisma.reaction.create({
      data: { postId: body.postId, userId: session.user.id, emoji: body.emoji },
    });
  }

  return new NextResponse(null, { status: 200 });
}
