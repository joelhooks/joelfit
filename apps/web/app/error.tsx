'use client'

import { useEffect } from 'react'
import { Button } from '@repo/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Well shit, something broke</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
} 