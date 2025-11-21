import * as React from "react"
import { cn } from "../lib/utils"

// --- Input ---
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 text-sm ring-offset-[#FCF9F2] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9CA3AF] placeholder:italic placeholder:font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CAAC6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[#1D1D1B]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// --- Textarea ---
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2 text-sm ring-offset-[#FCF9F2] placeholder:text-[#9CA3AF] placeholder:italic placeholder:font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CAAC6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y text-[#1D1D1B]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

// --- Label ---
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1D1D1B]",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

// --- Button (Shadcn Variant) ---
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const ButtonShadcn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#FCF9F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CAAC6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#9CAAC6] text-white hover:bg-[#8A98B0] h-10 px-4 py-2 w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonShadcn.displayName = "Button"

// --- Checkbox ---
const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className="relative flex items-center">
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-[#1D1D1B] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CAAC6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-[#9CAAC6] cursor-pointer",
        className
      )}
      {...props}
    />
  </div>
))
Checkbox.displayName = "Checkbox"

export { Input, Label, ButtonShadcn, Checkbox, Textarea }