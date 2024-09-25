import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string()
    .email('Ingresa un email válido')
    .trim(),
  password: z.string()
    .trim()
})
