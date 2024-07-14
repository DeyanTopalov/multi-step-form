import { z } from "zod";

export const testSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(1, { message: "This field is required" }),
});

export type TTestSchema = z.infer<typeof testSchema>;
