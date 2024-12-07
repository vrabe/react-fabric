import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useStore } from '../../hooks/useStore'
import type { ReactFabricState } from '../../types/store'

const selector = (state: ReactFabricState) => state.domNode?.querySelector('.react-fabric__canvas')

const NodeToolbarPortal = ({ children }: { children: ReactNode }) => {
  const wrapperRef = useStore(selector)

  if (!wrapperRef) {
    return null
  }

  return createPortal(children, wrapperRef)
}

export default NodeToolbarPortal
