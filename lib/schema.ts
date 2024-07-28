import { z } from "zod";

export const testSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(1, { message: "This field is required" }),
  billingPlan: z.object({
    name: z.string(),
    price: z.number(),
  }),
  billingCycle: z.enum(["monthly", "yearly"]),
  selectedAddons: z
    .array(
      z.object({
        title: z.string(),
        price: z.number(),
      }),
    )
    .optional(),
});

export type TTestSchema = z.infer<typeof testSchema>;
