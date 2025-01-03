import { useMemo } from 'react'
import type { AllCanvasEvents } from '../types/canvas'
import { UNCONTROLLED_PROPS } from '../utils/constants'

// 提取 default 属性的键
type DefaultKeys<T> = keyof T & `default${string}`

// 从 default 属性名转换为普通属性名
type DefaultToRegular<T> = {
  [K in DefaultKeys<T> as Uncapitalize<K extends `default${infer R}` ? R : never>]: T[K]
}

// 返回类型定义
type SplitResult<T> = [
  { [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] }, // listeners
  Omit<T, keyof AllCanvasEvents | DefaultKeys<T>>, // attributes
  DefaultToRegular<T>, // defaults
]

// TODO 同时存在defaultValue和attributes时，defaultValue优先级更高,进行报错,受控非受控模式只能二选一
export const useSplitProps = <T extends Record<string, any>>(props: T): SplitResult<T> => {
  // 检查属性冲突
  UNCONTROLLED_PROPS.forEach(prop => {
    const defaultProp = `default${prop.charAt(0).toUpperCase()}${prop.slice(1)}`
    if (props[prop] !== undefined && props[defaultProp] !== undefined) {
      throw new Error(
        `Cannot use both controlled '${prop}' and uncontrolled '${defaultProp}' for the same property. ` +
          `Either use controlled mode with '${prop}', or uncontrolled mode with '${defaultProp}', but not both.`,
      )
    }
  })

  // 计算非事件和非default属性的值的字符串表示
  const nonEventAndDefaultPropsString = useMemo(
    () =>
      JSON.stringify(
        Object.fromEntries(
          Object.entries(props).filter(([key]) => !key.startsWith('on') && !key.startsWith('default')),
        ),
      ),
    [props],
  )

  // 事件处理函数
  const listeners = useMemo(() => {
    const result: { [key: string]: any } = {}
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        result[key] = value
      }
    })
    return result as { [K in keyof AllCanvasEvents]?: AllCanvasEvents[K] }
  }, [props])

  // default 属性
  const defaults = useMemo(() => {
    const result: Record<string, unknown> = {}
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('default')) {
        result[key] = value
      }
    })
    return result as DefaultToRegular<T>
  }, [props])

  // 其他属性
  const attributes = useMemo(
    () => {
      const result: { [key: string]: any } = {}
      Object.entries(props).forEach(([key, value]) => {
        if (!key.startsWith('on') && !key.startsWith('default')) {
          result[key] = value
        }
      })
      return result as Omit<T, keyof AllCanvasEvents | DefaultKeys<T>>
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nonEventAndDefaultPropsString],
  )

  return [listeners, attributes, defaults]
}
