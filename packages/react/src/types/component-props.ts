import type { HTMLAttributes } from 'react'
import type { Node, NodeChange } from './nodes'

export type NodeMouseHandler<NodeType extends Node = Node> = (event: MouseEvent, node: NodeType) => void
export type OnNodeDrag<NodeType extends Node = Node> = (event: MouseEvent, node: NodeType, nodes: NodeType[]) => void
export type OnNodesChange<NodeType extends Node = Node> = (changes: NodeChange<NodeType>[]) => void
export type OnNodesDelete<NodeType extends Node = Node> = (nodes: NodeType[]) => void

export interface ReactFabricProps<NodeType extends Node = Node>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onError'> {
  minManualZoom: number
  /**
   * 受控模式使用
   * @example
   * const nodes = [
   * {
   * id:'node-id',
   * type:'rect',
   * data:{},
   * position:{x:250,y:250}
   * }
   * ]
   */
  nodes?: NodeType[]
  /**
   * 非受控模式使用
   */
  defaultNodes?: NodeType[]
  /** 当点击node时触发 */
  onNodeClick?: NodeMouseHandler<NodeType>
  /** 拖拽开始 */
  onNodeDragStart?: OnNodeDrag<NodeType>
  /** 拖拽中 */
  onNodeDrag?: OnNodeDrag<NodeType>
  /** 拖拽结束 */
  onNodeDragStop?: OnNodeDrag<NodeType>
  /**
   * 当一个node更新,则触发
   * @example
   * return (<ReactFabric onNodeChange={onNodeChange} {...rest} />)
   */
  onNodesChange: OnNodesChange<NodeType>
}
