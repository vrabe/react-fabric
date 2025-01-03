import type { Canvas } from 'fabric6'
import type { OnNodeDrag, OnNodesChange, OnNodesDelete } from './component-props'
import type { InternalNodeBase, Node } from './nodes'

export type OnError = (id: string, message: string) => void

export type ReactFabricStore<NodeType extends Node = Node> = {
  rfId: string
  width: number
  height: number
  nodes: NodeType[]
  onNodesChange: OnNodesChange | null
  hasDefaultNodes: boolean
  hasDefaultSelection: boolean
  domNode: HTMLDivElement | null
  zoom: number
  fitZoom: number
  manualZoom: number
  minManualZoom: number
  maxManualZoom: number
  isDragging: boolean
  selection?: boolean
  draggable: boolean
  lastPosX?: number
  lastPosY?: number
  scale: number
  defaultCentered?: boolean
  loading: boolean
  canvas: Canvas | null
  onNodeDragStart?: OnNodeDrag<NodeType>
  onNodeDrag?: OnNodeDrag<NodeType>
  onNodeDragStop?: OnNodeDrag<NodeType>
  // onMoveStart?: OnMoveStart;
  // onMove?: OnMove;
  // onMoveEnd?: OnMoveEnd;
  onNodesDelete?: OnNodesDelete<NodeType>
  debug: boolean
  zoomable: boolean

  onError?: OnError
}

export type UpdateNodePositions = (dragItems: Map<string, InternalNodeBase>, dragging?: boolean) => void

type Dimensions = {
  width?: number
  height?: number
}
export type ReactFabricActions = {
  setDimensions: (dimensions: Dimensions) => void
  setLoading: (loading: boolean) => void
  setZoom: (zoom: number) => void
  setMinManualZoom: (minManualZoom: number) => void
  setMaxManualZoom: (maxManualZoom: number) => void
  reset: () => void
  setDraggable: (enable: boolean) => void
  setFitZoom: (zoom: number) => void
  setManualZoom: (zoom: number) => void
  setZoomable: (enable: boolean) => void
  setSelection: (selection: boolean) => void
  setDefaultSelection: (selection: boolean | undefined) => void
  setIsDragging: (bool: boolean) => void
}
export type ReactFabricState<NodeType extends Node = Node> = ReactFabricStore<NodeType> & ReactFabricActions
