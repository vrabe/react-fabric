import type { Canvas, RectProps, TPointerEvent, TPointerEventInfo } from 'fabric'
import { Rect } from 'fabric'
import { useEffect, useMemo, useRef } from 'react'
import { useStoreApi } from '../hooks/useStore'

export type PluginFreeRectProps = Partial<RectProps> & {
  onComplete: (
    rectProps: Required<
      Pick<RectProps, 'left' | 'top' | 'width' | 'height'> & {
        pointsArray: number[]
      }
    > &
      RectProps,
    { canvas }: { canvas: Canvas },
  ) => Promise<void>
  /**
   * 当画布有选中对象时，是否禁用
   */
  disableWhenActive?: boolean
}

const DEFAULT_OPTIONS: Pick<RectProps, 'stroke' | 'strokeWidth' | 'fill'> = {
  stroke: '#04aa65',
  strokeWidth: 5,
  fill: 'transparent',
}

const PluginFreeRect = ({ onComplete, disableWhenActive = true, ...rectProps }: PluginFreeRectProps) => {
  const store = useStoreApi()
  const mouseDownPoint = useRef<{ x: number; y: number } | null>(null)
  const rectRef = useRef<Rect | null>(null)
  const isDrawing = useRef(false)
  const isCompleting = useRef(false)
  const strokeWidth = useMemo(() => rectProps?.strokeWidth ?? DEFAULT_OPTIONS.strokeWidth, [rectProps?.strokeWidth])

  useEffect(() => {
    const { canvas } = store.getState()
    if (!canvas) return
    const originHoverCursor = canvas.hoverCursor
    canvas.hoverCursor = 'crosshair'

    const handleMouseMove = (opt: TPointerEventInfo<TPointerEvent>) => {
      if (!mouseDownPoint.current || !rectRef.current) return

      const { x: currentX, y: currentY } = canvas.getScenePoint(opt.e)

      rectRef.current.set({
        left: Math.min(mouseDownPoint.current.x, currentX),
        top: Math.min(mouseDownPoint.current.y, currentY),
        width: Math.abs(currentX - mouseDownPoint.current.x) - strokeWidth,
        height: Math.abs(currentY - mouseDownPoint.current.y) - strokeWidth,
      })

      rectRef.current.setCoords()
      canvas.requestRenderAll()
    }

    const handleMouseUp = () => {
      canvas.off('mouse:move', handleMouseMove)
      canvas.off('mouse:up', handleMouseUp)
      if (!rectRef.current) return

      const currentRect = rectRef.current

      const cleanup = () => {
        canvas.remove(currentRect)
        mouseDownPoint.current = null
        rectRef.current = null
        isDrawing.current = false
        isCompleting.current = false
        canvas.requestRenderAll()
      }

      if (currentRect.width < 10 || currentRect.height < 10) {
        cleanup()
      } else {
        const coords = currentRect.getCoords()
        isCompleting.current = true
        Promise.resolve(
          onComplete(
            {
              ...DEFAULT_OPTIONS,
              ...(rectProps as RectProps),
              left: currentRect.left,
              top: currentRect.top,
              width: currentRect.width,
              height: currentRect.height,
              pointsArray: coords.reduce<number[]>(
                (acc, coord) => [...acc, Math.round(coord.x), Math.round(coord.y)],
                [],
              ),
            },
            {
              canvas: canvas,
            },
          ),
        ).finally(cleanup)
      }
    }

    const handleMouseDown = (opt: TPointerEventInfo<TPointerEvent>) => {
      if (isDrawing.current || isCompleting.current) return

      const point = canvas.getScenePoint(opt.e)
      mouseDownPoint.current = point

      if (disableWhenActive) {
        const activeObject = canvas.getActiveObject()
        if (activeObject) {
          return
        }
      }

      isDrawing.current = true
      rectRef.current = new Rect({
        ...DEFAULT_OPTIONS,
        left: point.x,
        top: point.y,
        width: 0,
        height: 0,
        ...rectProps,
      })
      canvas.add(rectRef.current)

      canvas.on('mouse:move', handleMouseMove)
      canvas.on('mouse:up', handleMouseUp)
    }

    canvas.on('mouse:down', handleMouseDown)

    return () => {
      canvas.hoverCursor = originHoverCursor
      canvas.off('mouse:down', handleMouseDown)
      if (rectRef.current) {
        canvas.remove(rectRef.current)
      }
      isDrawing.current = false
      canvas.requestRenderAll()
    }
  }, [store, onComplete, rectProps, strokeWidth, disableWhenActive])

  return null
}

export default PluginFreeRect
