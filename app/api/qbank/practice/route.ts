import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { subject, limit = 10 } = await req.json();

    if (!subject) {
      return NextResponse.json({ error: "Subject parameter is required" }, { status: 400 });
    }

    // Fetch questions matching the subject with their options
    const questions = await prisma.question.findMany({
      where: { subject },
      include: {
        options: {
          select: {
            id: true,
            label: true,
            text: true,
            imageUrl: true,
            sortOrder: true,
          },
          orderBy: { sortOrder: 'asc' }
        },
      },
    });

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "No questions found for this subject" }, { status: 404 });
    }

    // Shuffle and randomize the questions array, then slice to the requested block limit (10, 15, or 30)
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, parseInt(limit));

    // Format options map for frontend consumption while keeping correctOptionId hidden until submission/review
    const formattedQuestions = selectedQuestions.map((q) => ({
      id: q.id,
      subject: q.subject,
      topic: q.topic,
      stem: q.stem,
      imageUrl: q.imageUrl,
      difficulty: q.difficulty,
      options: q.options,
      correctOptionId: q.correctOptionId, // Sent for instant evaluation or can be filtered out for strict test mode
      explanation: q.explanation,
    }));

    return NextResponse.json({
      success: true,
      count: formattedQuestions.length,
      questions: formattedQuestions,
    });
  } catch (error: any) {
    console.error("Error generating practice block:", error);
    return NextResponse.json({ error: "Failed to fetch practice questions" }, { status: 500 });
  }
}