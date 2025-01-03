import { shallow } from 'zustand/shallow'
import { useStore } from '../hooks/useStore'
import type { ReactFabricState } from '../types/store'

const nodesSelector = (state: ReactFabricState) => state.zoom

export function useZoom(): number {
  const zoom = useStore(nodesSelector, shallow)

  return zoom
}
