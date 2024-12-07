import type { ReactNode } from 'react'
import { useContext } from 'react'
import { ReactFabricProvider } from '../../components/ReactFabricProvider'
import StoreContext from '../../contexts/StoreContext'
import type { Node } from '../../types/nodes'

export function Wrapper({
  children,
  nodes,
  defaultNodes,
  width,
  height,
}: {
  children: ReactNode
  nodes?: Node[]
  defaultNodes?: Node[]
  width?: number
  height?: number
}) {
  const isWrapped = useContext(StoreContext)

  if (isWrapped) {
    return <>{children}</>
  }

  return (
    <ReactFabricProvider initialNodes={nodes} defaultNodes={defaultNodes} initialWidth={width} initialHeight={height}>
      {children}
    </ReactFabricProvider>
  )
}
