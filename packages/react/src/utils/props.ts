import type { TPointerEvent } from 'fabric'
import { useMemo } from 'react'
import type { AllCanvasEvents } from '../types/canvas'

// 定义一个更具体的类型来替代 TEventWithTarget
type CustomEventWithTarget = {
  e: TPointerEvent
  target?: any
}

export const useSplitProps = <T extends Record<string, any>>(
  props: T
): [{ [K in keyof AllCanvasEvents]?: (event: CustomEventWithTarget) => void }, Omit<T, keyof AllCanvasEvents>] => {
  // 保持 nonEventPropsString 的记忆化
  const nonEventPropsString = useMemo(
    () => JSON.stringify(Object.fromEntries(Object.entries(props).filter(([key]) => !key.startsWith('on')))),
    [props]
  )

  // 事件处理函数
  const listeners = useMemo(() => {
    const result: { [key: string]: any } = {}
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        result[key] = value
      }
    })
    return result as { [K in keyof AllCanvasEvents]?: (event: CustomEventWithTarget) => void }
  }, [props])

  // 其他属性
  const attributes = useMemo(
    () => {
      const result: { [key: string]: any } = {}
      Object.entries(props).forEach(([key, value]) => {
        if (!key.startsWith('on')) {
          result[key] = value
        }
      })
      return result as Omit<T, keyof AllCanvasEvents>
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nonEventPropsString]
  )

  return [listeners, attributes]
}
