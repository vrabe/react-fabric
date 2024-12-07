import type { CSSProperties } from 'react'
import { memo } from 'react'

export interface MyCustomCSS extends CSSProperties {
  [key: `--${string}`]: number | string
}

const gridLinesStyle: MyCustomCSS = {
  pointerEvents: 'none',
  position: 'absolute',
  inset: 0,
  '--s': '20px' /* control the size of the grid */,
  '--n': 3 /* control the granularity */,
  '--t': '1px' /* the thickness */,
  '--g': '3px' /* the gap between dashes */,
  '--c': '#1890ff70 25%, #0000 0',
  background: `conic-gradient(at var(--g) var(--t), var(--c)) calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) 0 /
      calc(var(--s) / var(--n)) var(--s),
    conic-gradient(from 180deg at var(--t) var(--g), var(--c)) 0 calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) /
      var(--s) calc(var(--s) / var(--n))`,
  /* you probably don't need to set any size in your case */
  /* width: calc(round(down, 100%, var(--s)) + var(--t));
  height: calc(4 * var(--s) + var(--t)); */
}

const GridLine = memo(() => {
  return <div style={gridLinesStyle}></div>
})

export default GridLine
