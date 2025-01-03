import { shallow } from 'zustand/vanilla/shallow'
import { useMemo } from 'react'
import type { ReactFabricState } from '../types/store'
import { useStore, useStoreApi } from './useStore'

const selector = (s: ReactFabricState) => ({
  draggable: s.draggable,
  selection: s.selection,
  isDragging: s.isDragging,
  width: s.width,
  height: s.height,
  canvas: s.canvas,
  setDraggable: s.setDraggable,
  setIsDragging: s.setIsDragging,
  lastPosX: s.lastPosX,
  lastPosY: s.lastPosY,
  setSelection: s.setSelection,
  zoomable: s.zoomable,
  setZoomable: s.setZoomable,
  scale: s.scale,
  zoom: s.zoom,
  defaultCentered: s.defaultCentered,
  manualZoom: s.manualZoom,
  maxManualZoom: s.maxManualZoom,
  minManualZoom: s.minManualZoom,
  loading: s.loading,
})

export function useReactFabric() {
  const store = useStoreApi()
  const state = useStore(selector, shallow)

  const generalHelper = useMemo(() => {
    return {
      getCanvas: () => store.getState().canvas,
      getNodes: () => store.getState().nodes.map(n => ({ ...n })),
      getState: () => store.getState,

      /**
       * 放大
       */
      zoomIn: () => {
        let { manualZoom, canvas, fitZoom } = store.getState()
        manualZoom += 0.2
        const maxManualZoom = store.getState().maxManualZoom
        const minManualZoom = store.getState().minManualZoom
        if (manualZoom > maxManualZoom) manualZoom = maxManualZoom
        if (manualZoom < minManualZoom) manualZoom = minManualZoom

        const combinedZoom = manualZoom * fitZoom
        const bgImage = canvas?.backgroundImage
        if (bgImage && canvas) {
          // 返回画布的中心点，这个点是固定的 不受背景图位置和变换的影响
          const center = canvas.getCenterPoint()
          canvas.zoomToPoint(center, combinedZoom)
        }

        store.setState({
          manualZoom: manualZoom,
          zoom: combinedZoom,
        })
      },

      /**
       * 缩小
       */
      zoomOut: () => {
        let { manualZoom, canvas, fitZoom } = store.getState()
        manualZoom -= 0.2
        const maxManualZoom = store.getState().maxManualZoom
        const minManualZoom = store.getState().minManualZoom
        if (manualZoom > maxManualZoom) manualZoom = maxManualZoom
        if (manualZoom < minManualZoom) manualZoom = minManualZoom

        const combinedZoom = manualZoom * fitZoom
        const bgImage = canvas?.backgroundImage
        if (bgImage && canvas) {
          // 返回画布的中心点，这个点是固定的 不受背景图位置和变换的影响
          const center = canvas.getCenterPoint()
          canvas.zoomToPoint(center, combinedZoom)
        }

        store.setState({
          manualZoom: manualZoom,
          zoom: combinedZoom,
        })
      },
      getZoom: () => store.getState().zoom,

      /**
       * 重置视口/缩放
       */
      resetViewport: () => {
        let { canvas, fitZoom = 1, defaultCentered } = store.getState()

        const manualZoom = 1
        const combinedZoom = manualZoom * fitZoom
        if (canvas) {
          // 先重置 viewport transform
          if (defaultCentered && canvas.backgroundImage) {
            const bgWidth = canvas.backgroundImage.width || 0
            const bgHeight = canvas.backgroundImage.height || 0
            const deltaX = (canvas.width! - bgWidth * combinedZoom) / 2
            const deltaY = (canvas.height! - bgHeight * combinedZoom) / 2
            canvas.setViewportTransform([combinedZoom, 0, 0, combinedZoom, deltaX, deltaY])
          } else {
            canvas.setViewportTransform([combinedZoom, 0, 0, combinedZoom, 0, 0])
          }
          canvas.requestRenderAll()
        }

        store.setState({
          manualZoom: manualZoom,
          zoom: combinedZoom,
        })
      },
    }
  }, [store])

  return useMemo(
    () => ({
      ...generalHelper,
      ...state,
    }),
    [generalHelper, state],
  )
}
