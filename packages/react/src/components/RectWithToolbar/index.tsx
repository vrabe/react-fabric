import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { AllObjectEvents } from '../../types/object'
import NodeToolbarPortal from '../NodeToolbarPortal'
import Rect from '../Rect'

export type RectWithToolbarProps = Partial<AllObjectEvents> & {
  toolbar?: (options: any) => ReactNode
}

const RectWithToolbar = ({ onSelected, onDeselected, toolbar, ...props }: RectWithToolbarProps) => {
  const [position, setPosition] = useState<CSSProperties>()
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState()

  const wrapperStyle: CSSProperties = {
    position: 'absolute',
    ...position,
  }

  const onSelectedHandler: AllObjectEvents['onSelected'] = opt => {
    console.log('onSelectedHandler', opt.target.getBoundingRect())
    const boundingRect = opt.target.getBoundingRect()
    onSelected?.(opt)
    setOptions(opt)
    setVisible(true)
    setPosition({
      left: boundingRect.left + boundingRect.width / 2,
      transform: 'translate(-50%)',
      top: boundingRect.top + boundingRect.height + 20,
    })
  }

  const onDeselectedHandler: AllObjectEvents['onDeselected'] = opt => {
    console.log('onDeselectedHandler', opt)
    onDeselected?.(opt)
    setOptions(opt)
    setVisible(false)
  }

  const onMovingHandler: AllObjectEvents['onDeselected'] = opt => {
    console.log('onMovingHandler', opt)
    // setPosition(opt)
  }
  console.log('RectWithToolbar:render')
  useEffect(() => {
    console.log('RectWithToolbar:mounted')
  }, [])

  return (
    <>
      <Rect {...props} onSelected={onSelectedHandler} onDeselected={onDeselectedHandler} onMoving={onMovingHandler} />
      {visible && (
        <NodeToolbarPortal>
          <div style={wrapperStyle} className="react-fabric__node-toolbar">
            {toolbar ? toolbar(options) : <button>删除</button>}
          </div>
        </NodeToolbarPortal>
      )}
    </>
  )
}

export default RectWithToolbar
