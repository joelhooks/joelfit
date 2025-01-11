"use client"

import * as React from "react"
import { OTPInput, OTPInputContext, OTPInputProps, SlotProps } from "input-otp"
import { cn } from "../../lib/utils.js"
import { MinusIcon } from "@radix-ui/react-icons"
import type { IconProps } from "@radix-ui/react-icons/dist/types"

type InputOTPType = React.ForwardRefExoticComponent<
  OTPInputProps & React.RefAttributes<HTMLInputElement>
>

const InputOTP = React.forwardRef<HTMLInputElement, OTPInputProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
) as InputOTPType
InputOTP.displayName = "InputOTP"

type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = (inputOTPContext?.slots?.[index] ?? {}) as SlotProps

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          slot.isActive && "z-10 ring-1 ring-ring",
          className
        )}
        {...props}
      >
        {slot.char}
        {slot.hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <MinusIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
