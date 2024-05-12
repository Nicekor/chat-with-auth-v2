'use client'
import { PropsWithChildren, ReactNode, useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

interface IProps {
  fallback: ReactNode
}

export function ClientOnly({ fallback, children }: PropsWithChildren<IProps>) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return hydrated ? children : fallback
}
