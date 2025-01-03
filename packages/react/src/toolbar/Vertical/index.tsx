import { twMerge } from 'tailwind-merge'
import { Tooltip } from 'antd'
import { useReactFabric } from '../../hooks/useReactFabric'

export type ToolbarVerticalProps = {
  className?: string
}

/**
 *@desc 垂直toolbar
 * @returns
 */
const ToolbarVertical = ({ className }: ToolbarVerticalProps) => {
  const { manualZoom, zoomIn, zoomOut, maxManualZoom, minManualZoom, draggable, setDraggable, resetViewport } =
    useReactFabric()

  return (
    <section
      className={twMerge('flex flex-col items-center p-[10px_7px] bg-[#f7f7f7] rounded-lg gap-4', className)}
    >
      {/* fabric-tool */}
      <div className="flex flex-col items-center">
        {/* scale-view */}
        <Tooltip title="缩小" placement="right">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded cursor-pointer hover:bg-[var(--color-primary)]">
            {/* ic-tool-box */}
            <span
              className={`iconfont T_narrow text-[25px] ${Number(manualZoom.toFixed(2)) <= minManualZoom ? 'text-[#c4c4c4]' : ''}`}
              onClick={zoomOut}
            ></span>
          </div>
        </Tooltip>
        <span className="inline-block text-center my-[6px] text-sm font-semibold leading-[22px] min-w-[40px]">
          {' '}
          {/* scale-num */}
          {Math.round(manualZoom * 100)}%
        </span>
        <Tooltip title="放大" placement="right">
          <div className="w-[30px] h-[30px] flex items-center justify-center rounded cursor-pointer hover:bg-[var(--color-primary)]">
            <span
              className={`iconfont T_enlarge text-[25px] ${Number(manualZoom.toFixed(2)) >= maxManualZoom ? 'text-[#c4c4c4]' : ''}`}
              onClick={zoomIn}
            ></span>
          </div>
        </Tooltip>
      </div>
      <Tooltip title="选中可快速拖动" placement="right">
        <div
          onClick={() => setDraggable(!draggable)}
          className={`w-[30px] h-[30px] flex items-center justify-center rounded cursor-pointer hover:bg-[var(--color-primary)] ${
            draggable ? 'bg-[#04aa65]' : ''
          }`}
        >
          <span className="iconfont T_drag text-[25px]"></span>
        </div>
      </Tooltip>
      <Tooltip title="复原" placement="right">
        <div
          className="w-[30px] h-[30px] flex items-center justify-center rounded cursor-pointer hover:bg-[var(--color-primary)]"
          onClick={resetViewport}
        >
          <span className="iconfont T_reset text-[25px]"></span>
        </div>
      </Tooltip>
    </section>
  )
}

export default ToolbarVertical
