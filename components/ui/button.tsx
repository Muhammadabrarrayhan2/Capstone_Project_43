import * as React from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}
const variantClasses: Record<string,string> = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black",
  outline: "border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black",
  ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-900",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white",
};
const sizeClasses: Record<string,string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-8 text-base",
  icon: "h-9 w-9",
};
export function Button({ className, variant="default", size="default", ...props }: ButtonProps){
  return <button className={cn("inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50", variantClasses[variant], sizeClasses[size], className)} {...props} />;
}
