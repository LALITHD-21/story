import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "test@example.com",
      subject: `New Transmission from ${name}`,
      html: `
        <div style="font-family:Arial;padding:20px;background-color:#121212;color:#ffffff;border-radius:10px;">
          <h2 style="color:#00D1FF;">🚀 New Portfolio Contact</h2>
          <div style="background-color:#1a1a24;padding:15px;border-radius:8px;margin-top:20px;">
            <p><strong>Identifier:</strong> ${name}</p>
            <p><strong>Comms Link:</strong> ${email}</p>
          </div>
          <div style="margin-top:20px;background-color:#1a1a24;padding:15px;border-radius:8px;">
            <strong style="color:#00D1FF;">Payload:</strong>
            <p style="margin-top:10px;line-height:1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
