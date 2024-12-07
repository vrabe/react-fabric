import type {
  TPointerEvent,
  TPointerEventInfo,
  TEvent,
  FabricObject,
  FabricObjectProps,
  SerializedObjectProps,
  ObjectEvents,
  Transform,
  TOptions
} from 'fabric'

// 基础事件类型
export type FabricPointerEvent = TPointerEvent
export type FabricEventInfo = TPointerEventInfo
export type FabricEvent = TEvent<TPointerEvent>

// 对象相关事件类型
export type FabricObjectType = FabricObject<
  Partial<FabricObjectProps>,
  SerializedObjectProps,
  ObjectEvents
>

// 特定事件类型
export type BeforePathCreatedEvent = {
  path: FabricObjectType
}

// 事件处理器类型
export type FabricTransformEvent = {
  transform: Transform
  pointer: TPointerEvent
  options: TOptions<Record<string, unknown>>
}

// Canvas 事件映射
export interface FabricCanvasEvents {
  onBeforePathCreated?: (opt: BeforePathCreatedEvent) => void
  onPathCreated?: (event: FabricEvent) => void
  onMouseDown?: (event: FabricEvent) => void
  onMouseMove?: (event: FabricEvent) => void
  onMouseUp?: (event: FabricEvent) => void
  onMouseWheel?: (event: FabricEvent) => void
  // ... 其他事件类型
} 