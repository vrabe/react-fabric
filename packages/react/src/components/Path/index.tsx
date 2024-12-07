import type { Group as BaseGroup } from "fabric"
import { Path as BasePath } from "fabric"
import { forwardRef, memo, useImperativeHandle } from "react"
import { useCreateObject } from "../../hooks/useCreateObject"
import { useDidUpdate } from "../../hooks/useDidUpdate"
import { useSplitProps } from "../../hooks/useSplitProps"
import { useStoreApi } from "../../hooks/useStore"
import type { AllObjectEvents } from "../../types/object"

interface Handle {
  instance: BasePath | undefined
}

export type PathProps<T = unknown> = Partial<
  ConstructorParameters<typeof BasePath>[1] & AllObjectEvents
> & {
  group?: BaseGroup
  path?: string
} & T

const Path = forwardRef<Handle, PathProps>(
  ({ group, path = "M 0 0", ...props }, ref) => {
    const store = useStoreApi()

    const [listeners, attributes] = useSplitProps(props)

    const instance = useCreateObject({
      Constructor: BasePath,
      param: path,
      attributes,
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
        instance: instance
      }),
      [instance]
    )

    return null
  }
)

export default memo(Path)
