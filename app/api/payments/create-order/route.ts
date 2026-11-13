import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus } from "@prisma/client";
import Razorpay from "razorpay";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    // 1. Get the real logged-in user session
    const session = await auth();
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const { planId, optionId } = await req.json();

    // 2. Fetch the plan option or fallback safely for testing
    let amountPaise = 10000; // Force ₹100 for test payment mode!

    if (optionId) {
      const planOption = await prisma.planOption.findUnique({
        where: { id: optionId },
      });
      if (planOption) {
        // Keep database price if you want, or override with 10000 for testing
        amountPaise = 10000; 
      }
    }

    // 3. Create Razorpay Order
    const options = {
      amount: amountPaise, // ₹100 in paise
      currency: "INR",
      receipt: `receipt_rc_${Date.now()}`,
      notes: {
        userId,
        planId: planId || "test-plan",
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 4. Record pending payment transaction safely with the real userId
    const payment = await prisma.payment.create({
      data: {
        userId,
        planId: planId || "plan-b",
        optionId: optionId || null,
        amountPaise,
        status: PaymentStatus.CREATED,
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      paymentRecordId: payment.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: error.message || "Failed to create payment order" }, { status: 500 });
  }
}