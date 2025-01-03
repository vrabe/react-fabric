import { useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import type { ReactFabricProps } from '../../container/ReactFabric'
import { useStore, useStoreApi } from '../../hooks/useStore'
import type { Node } from '../../types/nodes'
import type { ReactFabricState } from '../../types/store'

const reactFabricFieldsToTrack = [
  'minManualZoom',
  'maxManualZoom',
  'width',
  'height',
  'zoomable',
  'defaultCentered',
  'defaultSelection',
  'selection',
] as const

type ReactFabricFieldsToTrack = (typeof reactFabricFieldsToTrack)[number]

type StoreUpdaterProps = Pick<ReactFabricProps, ReactFabricFieldsToTrack>

const fieldsToTrack = [...reactFabricFieldsToTrack, 'rfId'] as const

const selector = (s: ReactFabricState) => ({
  setMinManualZoom: s.setMinManualZoom,
  setMaxManualZoom: s.setMaxManualZoom,
  reset: s.reset,
  setDefaultSelection: s.setDefaultSelection,
})

const initPrevValues = {}

export function StoreUpdater<NodeType extends Node = Node>(props: StoreUpdaterProps) {
  const { reset, setMinManualZoom, setMaxManualZoom, setDefaultSelection } = useStore(selector, shallow)
  const store = useStoreApi<NodeType>()

  useEffect(() => {
    setDefaultSelection(props.defaultSelection)

    return () => {
      previousFields.current = initPrevValues
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const previousFields = useRef<Partial<StoreUpdaterProps>>(initPrevValues)

  useEffect(
    () => {
      for (const fieldName of fieldsToTrack) {
        const fieldValue = props[fieldName]
        const previousFieldValue = previousFields.current[fieldName]

        if (fieldValue === previousFieldValue) continue
        if (typeof props[fieldName] === 'undefined') continue
        else if (fieldName === 'minManualZoom') setMinManualZoom(fieldValue as number)
        else if (fieldName === 'maxManualZoom') setMaxManualZoom(fieldValue as number)
        else store.setState({ [fieldName]: fieldValue })
      }
      previousFields.current = props
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fieldsToTrack.map(fieldName => props[fieldName]),
  )

  return null
}
