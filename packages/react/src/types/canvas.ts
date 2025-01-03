import type { CanvasEvents } from 'fabric'
import type { MyCapitalize } from './utils'

export type RawEventNames<Events extends Record<string, any>> = {
  [K in keyof Events]: MyCapitalize<K & string>
}

// 首先创建一个泛型类型，将键（Key）映射成值（Value），并将值映射成键
type InvertedEventType<T extends Record<string, string>> = {
  [P in keyof T as T[P]]: P
}

// 应用反转类型到 Canvas 事件
type InvertedEventNames<Events extends Record<string, any>> = InvertedEventType<RawEventNames<Events>>

// 创建最终的 Canvas 事件类型，直接使用 CanvasEvents 中的类型定义
export type AllEvents<Events extends Record<string, any>> = {
  [K in keyof InvertedEventNames<Events>]: (opt: Events[InvertedEventNames<Events>[K] & keyof Events]) => void
}

// 为了向后兼容，可以添加类型别名
export type AllCanvasEvents = AllEvents<CanvasEvents>
