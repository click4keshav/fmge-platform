import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }

    // 1. Fetch all user attempts with answers and test metadata
    const attempts = await prisma.attempt.findMany({
      where: { userId },
      include: {
        test: true,
        answers: true,
      },
      orderBy: { submittedAt: "desc" },
    });

    if (!attempts || attempts.length === 0) {
      return NextResponse.json({
        success: true,
        analytics: {
          totalAttempts: 0,
          averageScore: 0,
          overallAccuracy: 0,
          avgTimePerQuestionSec: 0,
          recentTrend: [],
        },
      });
    }

    // 2. Compute aggregate metrics with null safety fallbacks
    let totalScore = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnattempted = 0;
    let totalTimeSpentSec = 0;
    let totalQuestionsAnswered = 0;

    attempts.forEach((att) => {
      totalScore += att.score ?? 0;
      totalCorrect += att.correct ?? 0;
      totalWrong += att.wrong ?? 0;
      totalUnattempted += att.unattempted ?? 0;

      att.answers.forEach((ans) => {
        totalTimeSpentSec += ans.timeSpentSec ?? 0;
        totalQuestionsAnswered++;
      });
    });

    const averageScore = Math.round(totalScore / attempts.length);
    const totalAttemptedCount = totalCorrect + totalWrong;
    const overallAccuracy = totalAttemptedCount > 0 
      ? Math.round((totalCorrect / totalAttemptedCount) * 100) 
      : 0;
    
    // Time-management efficiency index (average seconds spent per question)
    const avgTimePerQuestionSec = totalQuestionsAnswered > 0 
      ? Math.round(totalTimeSpentSec / totalQuestionsAnswered) 
      : 0;

    // 3. Peer Comparison Curve (Aggregate stats across ALL users in the database)
    const globalAggregates = await prisma.attempt.aggregate({
      _avg: {
        score: true,
        correct: true,
      },
      _max: {
        score: true,
      },
    });

    const topperMaxScore = globalAggregates._max.score ?? 0;
    const peerAverageScore = Math.round(globalAggregates._avg.score ?? 0);

    // 4. Format trend history for charts
    const recentTrend = attempts.slice(0, 5).reverse().map((att) => {
      const c = att.correct ?? 0;
      const w = att.wrong ?? 0;
      const attempted = c + w;
      return {
        testTitle: att.test.title,
        score: att.score ?? 0,
        accuracy: attempted > 0 ? Math.round((c / attempted) * 100) : 0,
        submittedAt: att.submittedAt,
      };
    });

    return NextResponse.json({
      success: true,
      analytics: {
        totalAttempts: attempts.length,
        averageScore,
        overallAccuracy,
        avgTimePerQuestionSec,
        peerAverageScore,
        topperMaxScore,
        recentTrend,
      },
    });
  } catch (error: any) {
    console.error("Error fetching server-side analytics:", error);
    return NextResponse.json({ error: error.message || "Failed to calculate analytics" }, { status: 500 });
  }
}