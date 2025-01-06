import { useState } from 'react'
import { ReactFabric, BackgroundImage, Rect, type RectProps, useReactFabric, ReactFabricProvider } from 'react-fabric2'
import './Counter.css'


export default function Counter() {
  const [rects, setRects] = useState<RectProps[]>([
    { left: 0, top: 0, width: 100, height: 100, fill: 'transparent', strokeWidth: 10, stroke: 'red' },
  ])

  
  return (
    <>
      <ReactFabricProvider>
      <Toolbar />
        <ReactFabric defaultCentered style={{ border: '1px solid black' }}>
          <BackgroundImage
            src="/bg.png"
            scaleToFit
          />
          {rects.map((rect,index) => (
            <Rect
              key={index}
              {...rect}
              onModified={({ target }) => {
                setRects(prevRects => 
                  prevRects.map((rect, idx) => 
                    idx === index ? { ...rect, ...target } : rect
                  )
                )
              }}
            
            />
          ))}
        </ReactFabric>
     
      </ReactFabricProvider>
    </>
  )
}

const Toolbar = () => {
  const { resetViewport, zoomIn, zoomOut, manualZoom ,canvas} = useReactFabric()
  return (
    <div>
      <button onClick={resetViewport} >重置</button>
      <button onClick={zoomIn}>放大</button>
      <span> {Math.round(manualZoom * 100)}%</span>
      <button onClick={zoomOut} >缩小</button>
      <button onClick={()=>{
       console.log('canvas',canvas);
      }}>canvas</button>
    </div>
  )
}
