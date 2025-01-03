import { createWithEqualityFn } from 'zustand/traditional'
import type { Node } from '../types/nodes'
import type { ReactFabricState } from '../types/store'
import getInitialState from './initialState'

const createStore = ({
  nodes,
  defaultNodes,
  width,
  height,
}: {
  nodes?: Node[]
  defaultNodes?: Node[]
  width?: number
  height?: number
}) =>
  createWithEqualityFn<ReactFabricState>(
    (set, get) => ({
      ...getInitialState({ nodes, width, height, defaultNodes }),
      setDimensions: (options: { width?: number; height?: number }) => {
        const { width, height } = options
        const currentState = get()

        // 合并现有尺寸和新尺寸
        const newDimensions = {
          width: width ?? currentState.width,
          height: height ?? currentState.height,
        }

        get().canvas?.setDimensions(newDimensions)
        set(newDimensions)
      },
      setLoading: loading => {
        set({ loading })
      },
      setDraggable: draggable => {
        set({ draggable })
        const canvas = get().canvas
        // TODO 无效
        if (canvas) {
          canvas.setCursor(draggable ? 'grab' : 'default')
          canvas.hoverCursor = draggable ? 'grab' : 'default'
          canvas.requestRenderAll()
        }
      },
      setZoomable: zoomable => {
        set({ zoomable })
      },

      setIsDragging: isDragging => {
        set({ isDragging })
      },
      setSelection: selection => {
        const canvas = get().canvas
        if (!canvas) return
        set({ selection })
        canvas.set('selection', selection)
        canvas.requestRenderAll()
      },
      setDefaultSelection: defaultSelection => {
        if (defaultSelection === undefined) return
        const { setSelection } = get()
        set({ hasDefaultSelection: true })
        setSelection(defaultSelection)
      },
      setFitZoom: (fitZoom: number) => {
        set({ fitZoom: fitZoom })
      },
      setManualZoom: (manualZoom: number) => {
        set({ manualZoom: manualZoom })
      },
      setMinManualZoom: (zoom: number) => {
        set({ minManualZoom: zoom })
      },
      setZoom: (zoom: number) => {
        set({ zoom: zoom })
      },
      setMaxManualZoom: (zoom: number) => {
        set({ maxManualZoom: zoom })
      },

      reset: () => set({ ...getInitialState() }),
    }),
    Object.is,
  )

export { createStore }
