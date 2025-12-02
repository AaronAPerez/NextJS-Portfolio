import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');
    const category = searchParams.get('category');

    const skills = await prisma.skill.findMany({
      where: {
        ...(published === 'true' && { published: true }),
        ...(category && { category }),
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const skill = await prisma.skill.create({
      data: body,
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
