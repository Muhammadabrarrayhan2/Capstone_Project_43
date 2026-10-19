import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={cn("flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900", className)} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return <textarea className={cn("flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900", className)} ref={ref} {...props} />;
  }
);
Textarea.displayName = "Textarea";
export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>){
  return <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />;
}
export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>){
  return <select className={cn("flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900", className)} {...props}>{children}</select>;
}
