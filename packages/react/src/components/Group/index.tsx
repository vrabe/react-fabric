import type { GroupEvents, GroupProps } from 'fabric'
import { Group as BaseGroup } from 'fabric'
import { Children, cloneElement, isValidElement, memo, useEffect, useLayoutEffect, useState } from 'react'
import { useDidUpdate } from '../../hooks/useDidUpdate'
import { useSplitProps } from '../../hooks/useSplitProps'
import { useStoreApi } from '../../hooks/useStore'
import type { AllEvents } from '../../types/canvas'
import { bindEvents } from '../../utils/events'

export type MyGroupProps = Partial<GroupProps & AllEvents<GroupEvents>> & {
  children: React.ReactElement<{ group?: BaseGroup }>[] | React.ReactElement<{ group?: BaseGroup }>
  controlsVisibility?: {
    ml?: boolean
    mt?: boolean
    mr?: boolean
    mb?: boolean
    mtr?: boolean
    tl?: boolean
    tr?: boolean
    bl?: boolean
    br?: boolean
  }
}

const Group = memo(({ children, controlsVisibility, ...props }: MyGroupProps) => {
  const store = useStoreApi()
  const [instance, setInstance] = useState<BaseGroup | null>(null)

  const [listeners, attributes] = useSplitProps(props)

  // 创建 Group 实例，但不立即添加到 canvas
  useLayoutEffect(() => {
    const newInstance = new BaseGroup([], {
      ...attributes,
    })
    setInstance(newInstance)

    return () => {
      const { canvas } = store.getState()
      if (newInstance && canvas) {
        canvas.remove(newInstance)
      }
      setInstance(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  // 等待子元素添加完成后，再将 group 添加到 canvas
  useEffect(() => {
    const { canvas } = store.getState()
    if (!instance || !canvas) return

    canvas.add(instance)
  }, [store, instance])

  // 单独处理事件绑定
  useEffect(() => {
    if (!instance) return

    const cleanup = bindEvents(instance, listeners)
    return cleanup
  }, [instance, listeners])

  // 专门处理 setControlsVisibility
  useEffect(() => {
    if (!instance || !controlsVisibility) return
    instance.setControlsVisibility(controlsVisibility)
  }, [instance, controlsVisibility])

  // 处理属性更新
  useDidUpdate(() => {
    const { canvas } = store.getState()
    if (!instance || !canvas) return

    instance.set(attributes)
    instance.setCoords()
    canvas.requestRenderAll()
  }, [attributes])

  return (
    <>
      {instance &&
        Children.map(children, child => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              group: instance,
            })
          }
          return null
        })}
    </>
  )
})

export default Group
