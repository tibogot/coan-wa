import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "COAN Website <onboarding@resend.dev>";

  // Preferred path: Resend (set RESEND_API_KEY in .env.local)
  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Website inquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend error:", details);
      return NextResponse.json(
        { error: "Could not send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  }

  // Dev / unconfigured fallback so the UI still works while you set up email
  if (process.env.NODE_ENV !== "production") {
    console.log("[contact form]", { name, email, phone, message });
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  return NextResponse.json(
    {
      error:
        "Contact email is not configured yet. Please email info@coanwa.com directly.",
    },
    { status: 503 },
  );
}
