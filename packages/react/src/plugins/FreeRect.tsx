import type { RectProps, TPointerEvent, TPointerEventInfo } from "fabric"
import { Rect } from "fabric"
import { useEffect, useRef } from "react"
import { useStoreApi } from "../hooks/useStore"

export type PluginFreeRectProps =  Partial<RectProps> & {
  onComplete: (
    rectProps: Required<Pick<RectProps, "left" | "top" | "width" | "height">> &
      RectProps
  ) => void
  
}

const DEFAULT_OPTIONS: Pick<RectProps, "stroke" | "strokeWidth" | "fill"> = {
  stroke: "tomato",
  strokeWidth: 1,
  fill: "transparent"
}

const PluginFreeRect = ({
  onComplete,
  ...rectProps
}: PluginFreeRectProps) => {
  const store = useStoreApi()
  const mouseDownPoint = useRef<{ x: number; y: number } | null>(null)
  const rectRef = useRef<Rect | null>(null)

  useEffect(() => {
    const { canvas } = store.getState()
    if (!canvas) return
    const originHoverCursor = canvas.hoverCursor
    canvas.hoverCursor = "default"

    const handleMouseMove = (opt: TPointerEventInfo<TPointerEvent>) => {
      if (!mouseDownPoint.current || !rectRef.current) return

      const { x: currentX, y: currentY } = canvas.getScenePoint(opt.e)
      const strokeWidth = rectProps.strokeWidth ?? DEFAULT_OPTIONS.strokeWidth

      rectRef.current.set({
        left: Math.min(mouseDownPoint.current.x, currentX),
        top: Math.min(mouseDownPoint.current.y, currentY),
        width: Math.abs(currentX - mouseDownPoint.current.x) - strokeWidth,
        height: Math.abs(currentY - mouseDownPoint.current.y) - strokeWidth
      })

      rectRef.current.setCoords()
      canvas.requestRenderAll()
    }

    const handleMouseUp = () => {
      if (!rectRef.current) return

      if (rectRef.current.width < 10 || rectRef.current.height < 10) {
        canvas.remove(rectRef.current)
      } else {
        onComplete({
          ...DEFAULT_OPTIONS,
          ...(rectProps as RectProps),
          left: rectRef.current.left,
          top: rectRef.current.top,
          width: rectRef.current.width,
          height: rectRef.current.height
        })
        canvas.remove(rectRef.current)
      }

      canvas.off("mouse:move", handleMouseMove)
      canvas.off("mouse:up", handleMouseUp)
      mouseDownPoint.current = null
      rectRef.current = null
      canvas.requestRenderAll()
    }

    const handleMouseDown = (opt: TPointerEventInfo<TPointerEvent>) => {
      const point = canvas.getScenePoint(opt.e)
      mouseDownPoint.current = point

      rectRef.current = new Rect({
        ...DEFAULT_OPTIONS,
        left: point.x,
        top: point.y,
        width: 0,
        height: 0,
        ...rectProps
      })
      canvas.add(rectRef.current)

      canvas.on("mouse:move", handleMouseMove)
      canvas.on("mouse:up", handleMouseUp)
    }

    canvas.on("mouse:down", handleMouseDown)

    return () => {
      canvas.hoverCursor = originHoverCursor
      canvas.off("mouse:down", handleMouseDown)
      canvas.requestRenderAll()
    }
  }, [store, onComplete, rectProps])

  return null
}

export default PluginFreeRect
