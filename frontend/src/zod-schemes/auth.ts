import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, { error: "Имя должно содержать как минимум 2 символа" })
  .trim();

const emailSchema = z.email({ error: "Некорректный email" }).trim();

const passwordSchema = z
  .string()
  .min(8, { error: "Пароль должен содержать как минимум 8 символов" })
  .regex(/[a-zA-Z]/, {
    error: "Пароль должен содержать как минимум одну латинскую букву",
  })
  .regex(/[0-9]/, { error: "Пароль должен содержать как минимум одну цифру" })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Пароль должен содержать как минимум 1 спец. символ",
  })
  .trim();

export const SignupFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignupFormSchemaType = z.output<typeof SignupFormSchema>;

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormSchemaType = z.output<typeof LoginFormSchema>;
