'use client'

import { createContext, useContext } from 'react'

const WaCtx = createContext<string>(
  process.env.NEXT_PUBLIC_WA_NUMBER ?? '212600000000'
)

export function WaProvider({ waNumber, children }: { waNumber: string; children: React.ReactNode }) {
  return <WaCtx.Provider value={waNumber}>{children}</WaCtx.Provider>
}

export function useWaNumber(): string {
  return useContext(WaCtx)
}
