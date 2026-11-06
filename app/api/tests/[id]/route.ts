import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: {
                  orderBy: { sortOrder: 'asc' },
                },
              },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json(test);
  } catch (error) {
    console.error('Failed to fetch test:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}