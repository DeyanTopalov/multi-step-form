import { NextResponse } from "next/server";
import { Resend } from "resend";
import ThankYou from "@components/Emails/ThankYou";
import { formSchema, TFormSchema } from "@lib/schema";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Default values for testing
// const defaultValues: TFormSchema = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   phoneNumber: "+1234567890",
//   billingPlan: { name: "Arcade", price: 9 },
//   billingCycle: "monthly",
//   selectedAddons: [
//     { title: "Online service", price: 1 },
//     { title: "Larger storage", price: 2 },
//   ],
// };

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming data using the existing schema
    const validatedData = formSchema.parse(body);

    //for testing
    // const mergedData = formSchema.parse(defaultValues);

    //for testing
    // const {
    //   name,
    //   email,
    //   phoneNumber,
    //   billingPlan,
    //   billingCycle,
    //   selectedAddons,
    // } = mergedData;

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
