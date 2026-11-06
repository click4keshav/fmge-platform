import { NextResponse } from "next/server";
import { PrismaClient, AttemptStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, testId, answers, timeSpentTotal } = await req.json();

    if (!userId || !testId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing required submission fields (userId, testId, answers)" }, { status: 400 });
    }

    // 1. Fetch the test and its associated questions with correct options
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    const evaluatedAnswers = [];

    // Map user answers for quick lookup: { [questionId]: selectedOptionId }
    const answerMap = new Map();
    answers.forEach((ans: { questionId: string; selectedOptionId: string | null; timeSpentSec?: number; markedForReview?: boolean }) => {
      answerMap.set(ans.questionId, ans);
    });

    // 2. Grade each question server-side
    for (const tq of test.questions) {
      const qId = tq.questionId;
      const userAns = answerMap.get(qId);
      const selectedOptionId = userAns?.selectedOptionId || null;
      const timeSpentSec = userAns?.timeSpentSec || 0;
      const markedForReview = userAns?.markedForReview || false;

      let isCorrect: boolean | null = null;

      if (!selectedOptionId) {
        unattemptedCount++;
      } else {
        if (selectedOptionId === tq.question.correctOptionId) {
          correctCount++;
          isCorrect = true;
        } else {
          wrongCount++;
          isCorrect = false;
        }
      }

      evaluatedAnswers.push({
        questionId: qId,
        selectedOptionId,
        markedForReview,
        timeSpentSec,
        isCorrect,
      });
    }

    // 3. Compute final score using test scoring configuration
    const score = (correctCount * test.marksCorrect) - (wrongCount * test.marksWrong);

    // 4. Persist Attempt and AttemptAnswers via Prisma Transaction in Supabase
    const deadlineAt = new Date(); // Set deadline anchor or actual finished timestamp
    const attempt = await prisma.attempt.create({
      data: {
        userId,
        testId,
        status: AttemptStatus.SUBMITTED,
        startedAt: new Date(Date.now() - (timeSpentTotal * 1000 || 0)),
        deadlineAt,
        submittedAt: new Date(),
        score,
        correct: correctCount,
        wrong: wrongCount,
        unattempted: unattemptedCount,
        answers: {
          create: evaluatedAnswers,
        },
      },
      include: {
        answers: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Test submitted and scored successfully",
      attemptId: attempt.id,
      summary: {
        score,
        correct: correctCount,
        wrong: wrongCount,
        unattempted: unattemptedCount,
        totalQuestions: test.totalQs,
      },
    });
  } catch (error: any) {
    console.error("Error processing test submission:", error);
    return NextResponse.json({ error: error.message || "Failed to submit test" }, { status: 500 });
  }
}