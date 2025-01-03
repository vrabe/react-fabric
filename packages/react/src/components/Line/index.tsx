import type { Group as BaseGroup } from 'fabric6'
import { Line as BaseLine } from 'fabric6'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useDidUpdate } from '../../hooks/useDidUpdate'
import { useSplitProps } from '../../hooks/useSplitProps'
import { useStoreApi } from '../../hooks/useStore'
import type { AllObjectEvents } from '../../types/object'

interface Handle {
  instance: BaseLine | undefined
}

export type LineProps<T = unknown> = Partial<ConstructorParameters<typeof BaseLine>[1] & AllObjectEvents> & {
  group?: BaseGroup
  path?: string
} & T

const Line = forwardRef<Handle, LineProps>(({ group, x1, y1, x2, y2, ...props }, ref) => {
  const store = useStoreApi()

  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseLine,
    param: [x1, y1, x2, y2],
    attributes,
    group,
    listeners,
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
      instance: instance,
    }),
    [instance],
  )

  return null
})

export default memo(Line)
