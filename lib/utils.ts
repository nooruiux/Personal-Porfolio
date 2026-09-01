import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely: `clsx` resolves conditionals, `twMerge`
 * de-duplicates conflicting utilities (e.g. `px-4` + `px-6` -> `px-6`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
