import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getServerSession } from '@/lib/auth';
import { CommentSchema } from '@/lib/schemas';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) return NextResponse.json({ error: 'Post ID required' }, { status: 400 });

  const comments = await prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      author: { select: { name: true, avatar: true } },
      replies: {
        include: { author: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const validation = CommentSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error, { status: 400 });

  const comment = await prisma.comment.create({
    data: {
      ...validation.data,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(comment);
}

export async function DELETE(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (comment.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
