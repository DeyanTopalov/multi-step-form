import { z } from "zod";

export const testSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(1, { message: "This field is required" }),
  billingPlan: z.string().min(1, { message: "This field is required" }),
  billingCycle: z.enum(["monthly", "yearly"], {
    message: "Please select a billing cycle",
  }),
  selectedAddons: z.array(z.string()).optional(),
});

export type TTestSchema = z.infer<typeof testSchema>;

// z.object with plans and add-ons as object containing the name, price & subscriptionPlan

// billingPlan: z.enum(["Arcade", "Advanced", "Pro"], {
//   message: "Please select a plan",
// }),
