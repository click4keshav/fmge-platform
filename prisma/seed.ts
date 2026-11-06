import { PrismaClient, PlanType, TestKind, Role, PlanStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding FMGE database...');

  // 1. Create sample student user
  const student = await prisma.user.upsert({
    where: { email: 'aditya@gmail.com' },
    update: {},
    create: {
      authId: 'demo-auth-id-001',
      name: 'Aditya',
      email: 'aditya@gmail.com',
      phone: '+91 98765 43210',
      role: Role.STUDENT,
      examYear: 2026,
      referralCode: 'ADITYA26',
    },
  });

  // 2. Create FMGE Test Series Plan
  const testSeriesPlan = await prisma.plan.upsert({
    where: { slug: 'fmge-pro-test-series' },
    update: {},
    create: {
      slug: 'fmge-pro-test-series',
      name: 'FMGE Pro Test Series 2026',
      type: PlanType.TEST_SERIES,
      description: 'Complete Grand Tests, Subject-wise tests, and PYQs for FMGE.',
      features: [
        '10 Full-Length Grand Tests',
        '19 Subject-Wise Tests',
        'Detailed Clinical Explanations',
      ],
      options: {
        create: [
          {
            label: '6 Months Access',
            durationDays: 180,
            pricePaise: 249900,
            mrpPaise: 499900,
          },
        ],
      },
    },
  });

  // 3. Assign active plan to student (Fixed math syntax for expiresAt)
  await prisma.userPlan.create({
    data: {
      userId: student.id,
      planId: testSeriesPlan.id,
      source: 'SEED',
      activatedAt: new Date(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      status: PlanStatus.ACTIVE,
    },
  });

  // 4. Create a Sample Pharmacology Test with 1 Question
  const q1 = await prisma.question.create({
    data: {
      subject: 'Pharmacology',
      topic: 'Autonomic Nervous System',
      stem: 'A 35-year-old farmer presents with pinpoint pupils, excessive salivation, and bradycardia after spraying pesticides. Which of the following is the specific physiological antagonist of choice?',
      explanation: 'Organophosphate poisoning causes cholinergic crisis. Atropine is a competitive muscarinic receptor blocker and the physiological antidote of choice.',
      difficulty: 2,
      options: {
        create: [
          { label: 'A', text: 'Pralidoxime', sortOrder: 1 },
          { label: 'B', text: 'Atropine', sortOrder: 2 },
          { label: 'C', text: 'Physostigmine', sortOrder: 3 },
          { label: 'D', text: 'Pilocarpine', sortOrder: 4 },
        ],
      },
    },
    include: { options: true },
  });

  const q1Correct = q1.options.find((o) => o.label === 'B');
  if (q1Correct) {
    await prisma.question.update({
      where: { id: q1.id },
      data: { correctOptionId: q1Correct.id },
    });
  }

  await prisma.test.create({
    data: {
      title: 'FMGE Pharmacology Mini Mock - ANS',
      kind: TestKind.PHARMA,
      planId: testSeriesPlan.id,
      totalQs: 1,
      durationMin: 15,
      marksCorrect: 1,
      marksWrong: 0,
      passMarks: 0.5,
      isPublished: true,
      questions: {
        create: [
          {
            questionId: q1.id,
            setNo: 1,
            sortOrder: 1,
          },
        ],
      },
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });