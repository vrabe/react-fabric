import type { CSSProperties } from 'react'

export type InternalNodeUpdate = {
  id: string
  nodeElement: HTMLDivElement
  force?: boolean
}

export type NodeBounds = XYPosition & {
  width: number | null
  height: number | null
}
export type NodeDragItem = {
  id: string
  position: XYPosition
  // distance from the mouse cursor to the node when start dragging
  distance: XYPosition
  measured: {
    width: number
    height: number
  }
  internals: {
    positionAbsolute: XYPosition
  }
  parentId?: string
  dragging?: boolean
}

export type InternalNodeBase<NodeType extends NodeBase = NodeBase> = NodeType & {
  measured: {
    width?: number
    height?: number
  }
  internals: {
    positionAbsolute: XYPosition
  }
}

export type XYPosition = {
  x: number
  y: number
}

export type NodeBase<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string = string,
> = {
  /**
   * 唯一id
   */
  id: string
  position: XYPosition
  data: NodeData
  type?: NodeType
  selectable?: boolean
  deletable?: boolean
  width?: number
  height?: number
  parentId?: string
  zIndex?: number
  // ... 其他的Fabric Object对象上的东西
}

export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string = string,
> = NodeBase<NodeData, NodeType> & {
  style?: CSSProperties
  className?: string
  resizing?: boolean
  focusable?: boolean
}

export type NodeDimensionChange = {
  id: string
  type: 'dimensions'
  /* if this is true, the node is currently being resized via the NodeResizer */
  resizing?: boolean
  /* if this is true, we will set width and height of the node and not just the measured dimensions */
  setAttributes?: boolean
}
export type NodePositionChange = {
  id: string
  type: 'position'
  position?: XYPosition
  positionAbsolute?: XYPosition
  dragging?: boolean
}

export type NodeSelectionChange = {
  id: string
  type: 'select'
  selected: boolean
}

export type NodeRemoveChange = {
  id: string
  type: 'remove'
}

export type NodeAddChange<NodeType extends NodeBase = NodeBase> = {
  item: NodeType
  type: 'add'
}

export type NodeReplaceChange<NodeType extends NodeBase = NodeBase> = {
  id: string
  item: NodeType
  type: 'replace'
}

export type NodeChange<NodeType extends NodeBase = NodeBase> =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange<NodeType>
  | NodeReplaceChange<NodeType>
