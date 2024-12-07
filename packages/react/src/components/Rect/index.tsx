import type { Group as BaseGroup } from "fabric"
import { Rect as BaseRect } from "fabric"
import { forwardRef, memo, useImperativeHandle } from "react"
import { useCreateObject } from "../../hooks/useCreateObject"
import { useDidUpdate } from "../../hooks/useDidUpdate"
import { useSplitProps } from "../../hooks/useSplitProps"
import { useStoreApi } from "../../hooks/useStore"
import type { AllObjectEvents } from "../../types/object"

interface Handle {
  instance: any
}

export type RectProps<T = unknown> = Partial<BaseRect & AllObjectEvents> & {
  group?: BaseGroup
  defaultLeft?: number
  defaultTop?: number
  defaultWidth?: number
  defaultHeight?: number
} & T

const Rect = forwardRef<Handle, RectProps>(
  (
    { group, defaultLeft, defaultTop, defaultWidth, defaultHeight, ...props },
    ref
  ) => {
    const store = useStoreApi()

    const [listeners, attributes] = useSplitProps(props)

    const instance = useCreateObject({
      Constructor: BaseRect,
      attributes: {
        left: defaultLeft,
        top: defaultTop,
        width: defaultWidth,
        height: defaultHeight,
        ...attributes
      },
      group,
      listeners
    })

    useDidUpdate(() => {
      const { canvas } = store.getState()

      if (instance) {
        instance.set(attributes)
        instance.setCoords()
        canvas?.requestRenderAll()
      }
    }, [attributes])

    useImperativeHandle(
      ref,
      () => ({
        instance
      }),
      [instance]
    )

    return null
  }
)

export default memo(Rect)
