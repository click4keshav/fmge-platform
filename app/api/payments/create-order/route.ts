import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus } from "@prisma/client";
import Razorpay from "razorpay";

const prisma = new PrismaClient();

// Initialize Razorpay SDK with keys from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    const { userId, planId, optionId } = await req.json();

    if (!userId || !planId || !optionId) {
      return NextResponse.json({ error: "Missing required fields (userId, planId, optionId)" }, { status: 400 });
    }

    // 1. Fetch the plan option details to get exact pricing in paise
    const planOption = await prisma.planOption.findUnique({
      where: { id: optionId },
      include: { plan: true },
    });

    if (!planOption || !planOption.isActive) {
      return NextResponse.json({ error: "Selected plan option not found or inactive" }, { status: 404 });
    }

    // PATCH: Set to 10000 paise (₹100) for testing, or use planOption.pricePaise for production
    let amountPaise = planOption.pricePaise;
    
    // Uncomment the line below if you want to force a ₹100 test payment right now:
    amountPaise = 10000; 

    // 2. Create Razorpay Order
    const options = {
      amount: amountPaise, // Amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_rc_${Date.now()}`,
      notes: {
        userId,
        planId,
        optionId,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 3. Record pending payment transaction in Supabase
    const payment = await prisma.payment.create({
      data: {
        userId,
        planId,
        optionId,
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