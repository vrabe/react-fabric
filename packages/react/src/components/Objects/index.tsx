import { memo } from 'react'
import Path from '../Path'
import Text from '../Text'
import Rect from '../Rect'
import Line from '../Line'

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
        // @ts-expect-error
        const Component = components[type.toLowerCase()]
        if (!Component) {
         
          return null
        }
        return <Component {...options} />
      })}
    </>
  )
}

export default memo(Objects)
