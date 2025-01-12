"use client"

import { useState } from "react"
import { Checkbox } from "@repo/ui"
import { type CheckedState } from "@radix-ui/react-checkbox"

interface ShoppingItemProps {
  item: string
}

export function ShoppingItem({ item }: ShoppingItemProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(checked: CheckedState) => setChecked(checked === true)}
        className="data-[state=checked]:bg-primary"
      />
      <span className={`text-sm ${checked ? "line-through text-muted-foreground" : ""}`}>
        {item}
      </span>
    </div>
  )
} 