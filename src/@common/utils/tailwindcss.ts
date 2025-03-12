import type { ClassValue } from "clsx"

import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const twVariants = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
