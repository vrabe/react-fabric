import { useMemo } from "react"
import type { AllCanvasEvents } from "../types/canvas"

// 添加hook版本，带有记忆化功能
export const useSplitProps = <T extends Record<string, any>>(
  props: T
): [
  { [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] },
  Omit<T, keyof AllCanvasEvents>
] => {
  // 先计算非事件属性的值的字符串表示
  const nonEventPropsString = useMemo(
    () =>
      JSON.stringify(
        Object.fromEntries(
          Object.entries(props).filter(([key]) => !key.startsWith("on"))
        )
      ),
    [props]
  )

  // 事件处理函数
  const listeners = useMemo(() => {
    const result: { [key: string]: any } = {}
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        result[key] = value
      }
    })
    return result as { [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] }
  }, [props])

  // 其他属性
  const attributes = useMemo(
    () => {
      const result: { [key: string]: any } = {}
      Object.entries(props).forEach(([key, value]) => {
        if (!key.startsWith("on")) {
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
