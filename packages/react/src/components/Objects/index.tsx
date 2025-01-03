import { memo } from 'react'
import Path from '../Path'
import Text from '../Text'
import Rect from '../Rect'
import Line from '../Line'
import * as Sentry from '@sentry/react'

export type ObjectsProps = {
  objects: { type: string; [index: string]: any }[]
}

const Objects = ({ objects }: ObjectsProps) => {
  const components = {
    rect: Rect,
    path: Path,
    text: Text,
    line: Line,
    'i-text': Text,
  }

  if (!objects) return null
  return (
    <>
      {objects?.map(({ type, ...options }) => {
        const Component = components[type.toLowerCase()]
        if (!Component) {
          Sentry.captureFeedback(
            { name: '缺少type字段,无法渲染', message: JSON.stringify(options) },
            { includeReplay: true },
          )
          return null
        }
        return <Component {...options} />
      })}
    </>
  )
}

export default memo(Objects)
