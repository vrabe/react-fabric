import type { CanvasEvents, CanvasOptions, TPointerEventInfo } from "fabric"
import { Canvas as BaseCanvas, Point } from "fabric"
import type { CSSProperties, PropsWithChildren } from "react"
import { useEffect, useLayoutEffect, useRef } from "react"
import useDraggable from "../../hooks/useDraggable"
import useResizeHandler from "../../hooks/useResizeHandler"
import { useSplitProps } from "../../hooks/useSplitProps"
import { useStoreApi } from "../../hooks/useStore"
import type { AllCanvasEvents } from "../../types/canvas"
import { bindEvents } from "../../utils/events"

const style: CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}

// 首先定义事件类型
type CanvasEventProps = {
  [K in keyof AllCanvasEvents]: AllCanvasEvents[K]
}

// 分离配置属性类型
type CanvasConfigProps = Omit<CanvasOptions, keyof CanvasEventProps>

// 重新定义 CanvasProps
export type CanvasProps = PropsWithChildren<
  Partial<CanvasConfigProps> & Partial<CanvasEventProps>
>

const Canvas = ({ children, onMouseWheel, ...props }: CanvasProps) => {
  const canvasRef = useRef<BaseCanvas | undefined>(undefined)
  const store = useStoreApi()
  const canvasDomRef = useRef<HTMLCanvasElement | null>(null)
  useDraggable()
  const domRef = useRef<HTMLDivElement>(null)

  const [listeners, attributes] = useSplitProps(props)

  useLayoutEffect(() => {
    const canvas = canvasDomRef.current

    canvasRef.current = new BaseCanvas(canvas || undefined, {
      ...attributes
    })

    // 绑定事件并获取清理函数
    const unbindEvents = bindEvents<CanvasEvents>(canvasRef.current, listeners)

    store.setState({
      canvas: canvasRef.current
    })

    return () => {
      unbindEvents() // 调用清理函数
      canvasRef.current?.dispose()
      canvas?.remove()
      canvasRef.current = undefined // 清除引用
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useResizeHandler()

  useEffect(() => {
    const onMouseWheelHandler = (opt: TPointerEventInfo<WheelEvent>) => {
      const {
        zoomable,
        maxManualZoom,
        minManualZoom,
        fitZoom = 1,
        zoom
      } = store.getState()
      if (!zoomable) return
      // 阻止默认行为，包括惯性滚动
      opt.e.preventDefault()
      opt.e.stopPropagation()
      // 如果是惯性滚动，直接返回
      if ((opt.e as any).wheelDeltaY === 0) return

      var delta = opt.e.deltaY

      const zoomFactor = delta > 0 ? 0.95 : 1.05
      var currentManualZoom = zoom / fitZoom
      var newManualZoom = currentManualZoom * zoomFactor

      if (newManualZoom > maxManualZoom / fitZoom)
        newManualZoom = maxManualZoom / fitZoom
      if (newManualZoom < minManualZoom / fitZoom)
        newManualZoom = minManualZoom / fitZoom

      const combinedZoom = newManualZoom * fitZoom

      canvasRef.current?.zoomToPoint(
        new Point(opt.e.offsetX, opt.e.offsetY),
        combinedZoom
      )

      store.setState({
        manualZoom: newManualZoom,
        zoom: combinedZoom
      })

      onMouseWheel?.(opt)
    }

    canvasRef.current?.on("mouse:wheel", onMouseWheelHandler)

    return () => {
      canvasRef.current?.off("mouse:wheel", onMouseWheelHandler)
    }
  }, [onMouseWheel, store])

  useEffect(() => {
    store.setState({
      domNode: domRef.current?.closest(".react-fabric") as HTMLDivElement
    })
  }, [store])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.set(attributes)
      canvasRef.current.requestRenderAll()
    }
  }, [attributes])

  return (
    <div className="react-fabric__canvas" ref={domRef} style={style}>
      <canvas ref={canvasDomRef}></canvas>
      {children}
    </div>
  )
}

export default Canvas
