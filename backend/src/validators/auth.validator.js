
import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});



export const loginSchema = z.object({
  
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(1, "Password can not be empty"),
});
