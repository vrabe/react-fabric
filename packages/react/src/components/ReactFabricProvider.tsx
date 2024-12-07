import type { ReactNode } from 'react'
import { useState } from 'react'
import { Provider } from '../contexts/StoreContext'
import { createStore } from '../store'
import type { Node } from '../types/nodes'

export type ReactFabricProviderProps = {
  initialNodes?: Node[]
  defaultNodes?: Node[]
  initialWidth?: number
  initialHeight?: number
  children: ReactNode
}
export function ReactFabricProvider({
  initialNodes: nodes,
  defaultNodes,
  initialWidth: width,
  initialHeight: height,
  children,
}: ReactFabricProviderProps) {
  const [store] = useState(() =>
    createStore({
      nodes,
      defaultNodes,
      width,
      height,
    }),
  )

  return <Provider value={store}>{children}</Provider>
}
