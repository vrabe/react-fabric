import type { CSSProperties } from "react"
import { forwardRef, memo } from "react"
import { Wrapper } from "./Wrapper"
import { Canvas } from "../../components"
import type { CanvasProps } from "../../components/Canvas"
import Loading from "../../components/Loading"
import { StoreUpdater } from "../../components/StoreUpdater"
import type { FabricEvent } from "../../types/events"

const wrapperStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
}

export type ReactFabricProps = Omit<CanvasProps, 'onMouseDown' | 'onMouseMove' | 'onMouseUp' | 'onMouseWheel'> & {
  style?: CSSProperties
  className?: string
  zoomable?: boolean
  minManualZoom?: number
  maxManualZoom?: number
  defaultCentered?: boolean
  defaultSelection?: boolean
  onMouseDown?: (event: FabricEvent) => void
  onMouseMove?: (event: FabricEvent) => void
  onMouseUp?: (event: FabricEvent) => void
  onMouseWheel?: (event: FabricEvent) => void
}

const InternalReactFabric = forwardRef<HTMLDivElement, ReactFabricProps>(
  ({
    minManualZoom,
    maxManualZoom,
    className,
    children,
    width,
    height,
    selection,
    style,
    onMouseWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    zoomable,
    defaultSelection,
    defaultCentered,
    ...rest
  }, ref) => {
    return (
      <div
        style={{ ...style, ...wrapperStyle }}
        ref={ref}
        className={`react-fabric ${className || ""}`}
      >
        <Wrapper width={width} height={height}>
          <StoreUpdater
            minManualZoom={minManualZoom}
            maxManualZoom={maxManualZoom}
            zoomable={zoomable}
            defaultCentered={defaultCentered}
            selection={selection}
            defaultSelection={defaultSelection}
          />
          <Canvas
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseWheel={onMouseWheel}
            {...rest}
          >
            {children}
          </Canvas>
          <Loading />
        </Wrapper>
      </div>
    )
  }
)

const ReactFabric = memo(InternalReactFabric) as typeof InternalReactFabric
export default ReactFabric
