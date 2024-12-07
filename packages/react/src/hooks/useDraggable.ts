import type { TPointerEvent, TPointerEventInfo } from "fabric"
import { useEffect, useRef } from "react"
import { shallow } from "zustand/shallow"
import type { ReactFabricState } from "../types/store"
import { useStore, useStoreApi } from "./useStore"

const selector = (s: ReactFabricState) => ({
  canvas: s.canvas,
  draggable: s.draggable
})

const useDraggable = () => {
  const store = useStoreApi()
  const { canvas, draggable } = useStore(selector, shallow)
  const lastPosXRef = useRef(0)
  const lastPosYRef = useRef(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    if (!draggable) return

    const onMouseDown = ({ e }: TPointerEventInfo<MouseEvent>) => {
      isDraggingRef.current = true
      lastPosXRef.current = e.clientX
      lastPosYRef.current = e.clientY
    }

    const onMouseMove = ({ e }: TPointerEventInfo<MouseEvent>) => {
      if (isDraggingRef.current && canvas) {
        var vpt = canvas.viewportTransform
        vpt[4] += e.clientX - lastPosXRef.current!
        vpt[5] += e.clientY - lastPosYRef.current!
        canvas.requestRenderAll()
        lastPosXRef.current = e.clientX
        lastPosYRef.current = e.clientY
      }
    }

    const onMouseUp = (_: TPointerEventInfo<TPointerEvent>) => {
      if (canvas) {
        canvas.setViewportTransform(canvas.viewportTransform)
        isDraggingRef.current = false
      }
    }

    canvas?.on("mouse:down", onMouseDown)
    canvas?.on("mouse:move", onMouseMove)
    canvas?.on("mouse:up", onMouseUp)

    return () => {
      canvas?.off("mouse:down", onMouseDown)
      canvas?.off("mouse:move", onMouseMove)
      canvas?.off("mouse:up", onMouseUp)
    }
  }, [canvas, draggable, store])

  return null
}

export default useDraggable
