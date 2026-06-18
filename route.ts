import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getIpFromRequest } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const ip = getIpFromRequest(request);
    const limit = rateLimit(`contact:${ip}`);

    if (!limit.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          resetAt: limit.resetAt,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    const lead = await db.lead.create({
      data: {
        type: "CONTACT",
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || null,
        website: data.website || null,
        adSpend: data.adSpend || null,
        message: data.message,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent") ?? null,
        referrer: request.headers.get("referer") ?? null,
      },
    });

    const emailResults = await Promise.allSettled([
      sendContactNotification(data),
      sendContactConfirmation(data),
    ]);

    const emailSent = emailResults.every((r) => r.status === "fulfilled");

    await db.lead.update({
      where: { id: lead.id },
      data: { emailSent, notified: emailResults[0].status === "fulfilled" },
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[contact/route] error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
