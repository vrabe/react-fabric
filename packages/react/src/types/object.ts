import type { CanvasEvents } from 'fabric'
import type {
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  TEvent,
  TPointerEvent,
} from 'fabric'
import type { MyCapitalize } from './utils'

export type FabricParams = {
  domNode: HTMLCanvasElement
  onEvent: CanvasEvents
}

export type TEventCallback<T = any> = (options: T) => any

export type RawEventNames = {
  [K in keyof ObjectEvents]: MyCapitalize<K>
}

// 首先创建一个泛型类型，将键（Key）映射成值（Value），并将值映射成键
type InvertedEventType<T extends Record<string, string>> = {
  [P in keyof T as T[P]]: P
}

// 应用上述泛型类型
type InvertedRawEventNames = InvertedEventType<RawEventNames>

export interface AllObjectEvents
  extends Record<keyof InvertedRawEventNames, TEventCallback>,
    TEventCallback<
      Partial<TEvent<TPointerEvent>> & {
        target: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>
      }
    > {}

export type FabricUpdateOptions = {}
