'use client'

import { type ButtonProps, Button } from '../ui/button.js'
import { ReloadIcon } from '@radix-ui/react-icons'
import { cn } from '../../lib/utils.js'

interface RetryButtonProps extends ButtonProps {
  isRetrying?: boolean
  label?: string
}

export function RetryButton({
  isRetrying = false,
  label = 'Try again',
  ...props
}: RetryButtonProps) {
  return (
    <Button
      variant="outline"
      disabled={isRetrying}
      {...props}
    >
      <ReloadIcon className={cn(
        'mr-2 h-4 w-4',
        isRetrying && 'animate-spin'
      )} />
      {label}
    </Button>
  )
} 