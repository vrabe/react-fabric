import type { Group as BaseGroup } from 'fabric6'
import { Rect as BaseRect } from 'fabric6'
import { forwardRef, memo, useImperativeHandle } from 'react'
import { useCreateObject } from '../../hooks/useCreateObject'
import { useSplitProps } from '../../hooks/useSplitProps'
import type { AllObjectEvents } from '../../types/object'

export type RectProps<T = unknown> = Partial<BaseRect & AllObjectEvents> & {
  group?: BaseGroup
  defaultLeft?: number
  defaultTop?: number
  defaultWidth?: number
  defaultHeight?: number
} & T

const Rect = forwardRef<BaseRect | undefined, RectProps>(({ group, ...props }, ref) => {
  const [listeners, attributes, defaultValues] = useSplitProps(props)

  const instance = useCreateObject({
    Constructor: BaseRect,
    defaultValues,
    attributes,
    group,
    listeners,
  })

  useImperativeHandle(ref, () => instance, [instance])

  return null
})

export default memo(Rect)
