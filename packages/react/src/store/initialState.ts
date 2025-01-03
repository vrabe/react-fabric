import type { Node } from '../types/nodes'
import type { ReactFabricStore } from '../types/store'

const getInitialState = ({
  nodes,
  defaultNodes,
  defaultSelection,
}: {
  nodes?: Node[]
  defaultNodes?: Node[]
  width?: number
  defaultSelection?: boolean
  height?: number
} = {}): ReactFabricStore => {
  const storeNodes = defaultNodes ?? nodes ?? []

  return {
    width: 200,
    height: 200,
    canvas: null,
    nodes: storeNodes,
    onNodesChange: null,
    hasDefaultNodes: defaultNodes !== undefined,
    hasDefaultSelection: defaultSelection !== undefined,
    zoom: 1,
    minManualZoom: 0.4,
    maxManualZoom: 3,
    domNode: null,
    debug: false,
    isDragging: false,
    selection: defaultSelection ?? true, // 必须跟着 fabric 默认值 true
    zoomable: true,
    draggable: false,
    scale: 1,
    lastPosX: undefined,
    lastPosY: undefined,
    loading: false,
    fitZoom: 1,
    manualZoom: 1,
    defaultCentered: false,
  }
}

export default getInitialState
