import type { Group as BaseGroup } from 'fabric'
import { FabricText } from 'fabric'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useDidUpdate } from '../../hooks/useDidUpdate'
import { useSplitProps } from '../../hooks/useSplitProps'
import { useStoreApi } from '../../hooks/useStore'
import type { AllObjectEvents } from '../../types/object'

export type Handle = {
  instance: FabricText | undefined
}

export type TextProps<T = unknown> = Partial<ConstructorParameters<typeof FabricText>[1] & AllObjectEvents> & {
  group?: BaseGroup
  text: string
} & T

const Text = forwardRef<Handle, TextProps>(({ group, text, ...props }, ref) => {
  const store = useStoreApi()

  const [listeners, attributes] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: FabricText,
    param: text,
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
      instance,
    }),
    [instance],
  )

  return null
})

export default memo(Text)
