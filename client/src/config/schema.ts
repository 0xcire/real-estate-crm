import { z } from 'zod';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

export const username = z.string().min(3).max(24);

export const name = z
  .string()
  .refine(
    (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
    'Name can only contain letters'
  )
  .refine(
    (value) => /^[A-Z][a-z]+\s(?:[A-Z]\s)?[A-Z][a-z]+$/.test(value),
    'Please enter your full name as First M Last.'
  );

export const mobilePhone = z
  .string()
  .refine((value) => isMobilePhone(value, 'en-US'));

export const verifyPassword = z.string().min(8).max(255);

export const signUpPassword = z
  .string()
  .min(8, {
    message: 'Must be greater than 8 characters',
  })
  .max(255, {
    message: 'Password must be between 8 and 255 characters.',
  })
  .refine(
    (value) => /^(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),
    'Password must contain one number and one special character.'
  );
