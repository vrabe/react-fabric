import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

/**
 * 只在依赖更新时执行的 effect hook
 * @param effect 要执行的副作用函数
 * @param deps 依赖数组
 * https://mantine.dev/hooks/use-did-update/
 */
export function useDidUpdate(effect: EffectCallback, deps?: DependencyList): void {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      return effect()
    }

    didMount.current = true
    return undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
