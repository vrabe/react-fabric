import { useState } from "react"
import { ReactFabric, BackgroundImage, Rect } from "react-fabric2"

const rects:any[]=[]
export default function Counter() {
  return (
    <>
      <ReactFabric defaultCentered  style={{ border: '1px solid red' }}>
        {
          rects.map((rect,index)=>(
            <Rect key={index} {...rect} left={rect.defaultLeft} strokeWidth={1} top={rect.defaultTop}  width={rect.defaultWidth} height={rect.defaultHeight}/>
          ))
        }
      
      </ReactFabric>
    </>
  )
}
