'use server';

import { prisma } from '@/lib/prisma';

export async function getDashboardData() {
  try {
    // Fetch our seeded student Aditya
    const student = await prisma.user.findUnique({
      where: { email: 'aditya@gmail.com' },
      include: {
        userPlans: {
          include: { plan: true },
        },
        attempts: {
          include: { test: true },
        },
      },
    });

    // Fetch available tests
    const tests = await prisma.test.findMany({
      where: { isPublished: true },
      include: { plan: true },
    });

    return { student, tests };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return { student: null, tests: [] };
  }
}