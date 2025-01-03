import type { AllCanvasEvents } from '../types/canvas'

export const splitListenerProps = <T extends Record<string, any>>(
  props: T,
): [{ [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] }, Omit<T, keyof AllCanvasEvents>] => {
  return Object.entries(props).reduce(
    ([listeners, options], [key, value]) => {
      if (key.startsWith('on')) {
        ;(listeners as any)[key] = value
      } else {
        ;(options as any)[key] = value
      }
      return [listeners, options]
    },
    [{} as { [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] }, {} as Omit<T, keyof AllCanvasEvents>],
  )
}

// 工具函数：转换 default 属性
export const transformDefaultProps = (defaultValues: Record<string, unknown>) => {
  return Object.entries(defaultValues).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('default')) {
        // 使用正则替换 'default' 并将首字母小写
        const propName = key.replace(/^default([A-Z])/, (_, c) => c.toLowerCase())
        acc[propName] = value
      }
      return acc
    },
    {} as Record<string, unknown>,
  )
}
