import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UpdateUserProfileFormSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  photoUrl: z.string().optional(),
});
