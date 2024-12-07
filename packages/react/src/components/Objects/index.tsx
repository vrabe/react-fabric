import { memo } from "react"
import Path from "../Path"
import Text from "../Text"
import Rect from "../Rect"

export type ObjectsProps = {
  objects: { type: string; [index: string]: any }[]
}

const Objects = ({ objects }: ObjectsProps) => {
  const components = {
    rect: Rect,
    path: Path,
    text: Text,
    "i-text": Text
  }

  if (!objects) return null
  return (
    <>
      {objects?.map(({ type, ...options }) => {
        const Component =
          components[type.toLowerCase() as keyof typeof components]
        if (!Component) {
          return null
        }
        return <Component {...options} />
      })}
    </>
  )
}

export default memo(Objects)
