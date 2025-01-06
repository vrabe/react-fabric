import type { FabricObject, Group } from 'fabric'
import { useEffect, useMemo, useRef } from 'react'
import type { AllObjectEvents } from '../types/object'
import { bindEvents } from '../utils/events'
import { transformDefaultProps } from '../utils/props'
import { useDidUpdate } from './useDidUpdate'
import { useStore, useStoreApi } from './useStore'

type SingleParamConstructor<T> = new (attributes: any) => T
type DualParamConstructor<T, P> = new (param: P, attributes: any) => T

type CreateObjectProps<T extends FabricObject, P = any> = {
  Constructor: SingleParamConstructor<T> | DualParamConstructor<T, P>
  attributes: any
  defaultValues?: any
  param?: P
  group?: Group
  listeners?: Partial<AllObjectEvents>
}

export function useCreateObject<T extends FabricObject, P = any>({
  Constructor,
  attributes,
  defaultValues = {},
  param,
  group,
  listeners = {},
}: CreateObjectProps<T, P>) {
  const store = useStoreApi()
  const canvas = useStore( state => state.canvas)


  // 使用 ref 记录控制模式
  const modeRef = useRef<'controlled' | 'uncontrolled' | null>(null)

  // 在创建实例时确定控制模式
  const instance = useMemo(() => {
    const hasUncontrolledProps = Object.keys(defaultValues).length > 0
    modeRef.current = hasUncontrolledProps ? 'uncontrolled' : 'controlled'

    const mergedAttributes = {
      ...attributes,
      ...transformDefaultProps(defaultValues),
    }

    const newInstance =
      param !== undefined
        ? new (Constructor as DualParamConstructor<T, P>)(param, mergedAttributes)
        : new (Constructor as SingleParamConstructor<T>)(mergedAttributes)
    return newInstance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Constructor, param])

  // 计算父容器（group 或 canvas）
  const parent = useMemo(() => group ?? canvas, [group, canvas])

  // 处理实例的添加和移除
  useEffect(() => {
    if (!instance || !parent) return
    // 添加到父容器
    parent.add(instance)

    return () => {
      try {
        if (instance) {
          // 移除所有事件监听
          instance.off()

          // 从父容器中移除
          if (parent.contains(instance)) {
            parent.remove(instance)
          }

          // 如果存在 dispose 方法则调用
          if (typeof instance.dispose === 'function') {
            instance.dispose()
          }
        }
      } catch (error) {
        console.warn('清理对象时发生错误:', error)
      }
    }
  }, [instance, parent])

  // 处理事件绑定
  useEffect(() => {
    if (!instance) return
    return bindEvents(instance, listeners)
  }, [instance, listeners])

  // 处理属性更新
  useDidUpdate(() => {
    if (!instance) return
    const { canvas } = store.getState()

    // 在非受控模式下，跳过位置相关属性的更新
    if (modeRef.current === 'uncontrolled') {
      const styleUpdates = Object.entries(attributes).reduce(
        (acc, [key, value]) => {
          if (!key.match(/^(left|top|width|height|scaleX|scaleY|angle|points|path|originX|originY)$/)) {
            acc[key] = value
          }
          return acc
        },
        {} as Record<string, any>,
      )

      if (Object.keys(styleUpdates).length > 0) {
        instance.set(styleUpdates)
        canvas?.requestRenderAll()
      }
    } else {
      // 受控模式：正常更新所有属性
      instance.set(attributes)
      instance.setCoords()
      canvas?.requestRenderAll()
    }
  }, [instance, attributes, store])

  return instance
}
