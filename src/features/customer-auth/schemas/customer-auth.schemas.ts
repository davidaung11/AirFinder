import { z } from "zod";

export const customerLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const customerRegistrationSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name is required."),
    phone: z.string().trim().min(8, "Enter a valid phone number."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const customerProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phone: z.string().trim().min(8, "Enter a valid phone number."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  preferredArea: z.string(),
});

export type CustomerLoginValues = z.infer<typeof customerLoginSchema>;
export type CustomerRegistrationValues = z.infer<
  typeof customerRegistrationSchema
>;
export type CustomerProfileValues = z.infer<typeof customerProfileSchema>;
