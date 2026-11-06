import { NextResponse } from "next/server";
import { PrismaClient, PaymentStatus, PlanStatus } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing Razorpay signature header" }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    // 1. Verify cryptographic signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // 2. Handle successful payment captured event
    if (event.event === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;
      const notes = paymentEntity.notes; // Contains userId, planId, optionId

      const userId = notes?.userId;
      const planId = notes?.planId;
      const optionId = notes?.optionId;

      if (!userId || !planId || !optionId) {
        console.error("Webhook missing metadata notes:", notes);
        return NextResponse.json({ error: "Missing metadata in payment notes" }, { status: 400 });
      }

      // Fetch plan option duration to calculate expiration
      const planOption = await prisma.planOption.findUnique({
        where: { id: optionId },
      });

      const durationDays = planOption?.durationDays || 365;
      const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

      // 3. Database Transaction: Update Payment and Grant User Subscription
      await prisma.$transaction(async (tx) => {
        // Update payment status
        const updatedPayment = await tx.payment.update({
          where: { razorpayOrderId },
          data: {
            status: PaymentStatus.CAPTURED,
            razorpayPaymentId,
            capturedAt: new Date(),
          },
        });

        // Create or activate UserPlan subscription
        await tx.userPlan.create({
          data: {
            userId,
            planId,
            paymentId: updatedPayment.id,
            source: "RAZORPAY_WEBHOOK",
            activatedAt: new Date(),
            expiresAt,
            status: PlanStatus.ACTIVE,
          },
        });
      });

      console.log(`✅ Subscription successfully activated for user ${userId} via order ${razorpayOrderId}`);
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Webhook handling failed" }, { status: 500 });
  }
}