import type { FabricObject, Group } from "fabric"
import { useEffect, useRef, useState } from "react"
import type { AllObjectEvents } from "../types/object"
import { bindEvents } from "../utils/events"
import { useStoreApi } from "./useStore"

type SingleParamConstructor<T> = new (attributes: any) => T
type DualParamConstructor<T, P> = new (param: P, attributes: any) => T

type CreateObjectProps<T extends FabricObject, P = any> = {
  Constructor: SingleParamConstructor<T> | DualParamConstructor<T, P>
  attributes: any
  param?: P
  group?: Group
  listeners?: Partial<AllObjectEvents>
}

export function useCreateObject<T extends FabricObject, P = any>({
  Constructor,
  attributes,
  param,
  group,
  listeners = {}
}: CreateObjectProps<T, P>) {
  const [instance, setInstance] = useState<T | undefined>()
  const store = useStoreApi()
  const attributesRef = useRef(attributes)

  // 更新 attributesRef
  useEffect(() => {
    attributesRef.current = attributes
  }, [attributes])

  // 只负责创建和销毁实例
  useEffect(() => {
    const { canvas } = store.getState()
    const parent = group ?? canvas

    // 创建新实例
    const newInstance =
      param !== undefined
        ? new (Constructor as DualParamConstructor<T, P>)(
            param,
            attributesRef.current
          )
        : new (Constructor as SingleParamConstructor<T>)(attributesRef.current)

    parent?.add(newInstance)
    setInstance(newInstance)
    return () => {
      if (newInstance) {
        parent?.remove(newInstance)
        setInstance(undefined)
      }
    }
  }, [Constructor, param, group, store])

  // 专门处理事件监听的绑定和解绑
  useEffect(() => {
    if (!instance) return
    // 绑定新的事件监听器
    return bindEvents(instance, listeners)
  }, [instance, listeners])

  return instance
}
