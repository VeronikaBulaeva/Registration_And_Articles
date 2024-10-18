import { z } from 'zod';

export const textSchema = z
  .string()
  .min(2, 'Значение не должно быть короче 2-х символов')
  .max(20, 'Значение не должно быть длиннее 20 символов')
  .regex(/^[-а-яА-ЯёЁa-zA-Z\s]+$/, 'Значение должно содержать только буквы')
  .trim();

export const passwordSchema = z
  .string()
  .min(8, 'Пароль не должен быть короче 8-ми символов')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Пароль должен содержать по крайней мере, одну заглавную букву, одна строчную букву, одну цифру и один специальный символ',
  )
  .trim();

export const formSchema = z.object({
  username: z
    .string()
    .min(2, 'Значение не должно быть короче 2-х символов')
    .max(20, 'Значение не должно быть длиннее 20 символов')
    .regex(/^[-а-яА-ЯёЁa-zA-Z1-9\s]+$/, 'Значение должно содержать только буквы или цифры')
    .trim(),
  first_name: textSchema,
  last_name: textSchema,
  email: z.string().email('Проверьте корректность email-адреса').trim(),
  password: passwordSchema,
});

export const changePasswordSchema = z
  .object({
    old_password: passwordSchema,
    password: passwordSchema,
    confirmed_password: passwordSchema,
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.confirmed_password) {
      ctx.addIssue({
        message: 'Пароли не совпадают',
        path: ['confirmed_password'],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormFields = z.infer<typeof formSchema>;
export type PasswordFields = z.infer<typeof changePasswordSchema>;
