import { NextResponse } from "next/server";
import { Resend } from "resend";
import ThankYou from "@components/Emails/ThankYou";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phoneNumber,
      billingPlan,
      billingCycle,
      selectedAddons,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["deyan.topalow@gmail.com"],
      subject: "Test Email",
      react: ThankYou(),
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
