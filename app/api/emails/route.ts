import { NextResponse } from "next/server";
import { Resend } from "resend";
import ThankYou from "@components/Emails/ThankYou";
import { formSchema, TFormSchema } from "@lib/schema";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming data using the existing schema
    const validatedData = formSchema.parse(body);

    const {
      name,
      email,
      phoneNumber,
      billingPlan,
      billingCycle,
      selectedAddons,
    } = validatedData;

    const { data, error } = await resend.emails.send({
      from: "multi-step-form@testingstuff.website",
      to: [email],
      subject: "Test Email",
      react: ThankYou({ name, billingPlan, billingCycle, selectedAddons }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If it's a validation error, return the error messages
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    // For any other errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
