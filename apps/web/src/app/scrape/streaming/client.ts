'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { StreamedResponse, StreamedResponseItem } from './types'

export function useStreamingResponse(
  action: () => Promise<StreamedResponse>
): {
  items: StreamedResponseItem[]
  refetch: () => void
} {
  const [items, setItems] = useState<StreamedResponseItem[]>([])

  const id = useRef<string | null>(null)
  const pending = useRef(false)

  const refetch = useCallback(() => {
    if (!pending.current) {
      const getNext = (resp: StreamedResponse) => {
        if (!resp?.id) return
        id.current = resp.id
        setItems(resp.items || [])
        if (resp.next && id.current) {
          resp.next(id.current).then(getNext)
        } else {
          pending.current = false
        }
      }
      setItems([])
      pending.current = true
      action().then(getNext)
    }
  }, [action])

  // Don't auto-fetch on mount
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    refetch()
  }, [refetch])

  return { items, refetch }
} 