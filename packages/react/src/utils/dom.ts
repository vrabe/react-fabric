import type { Dimensions } from '../types/utils'

export const getDimensions = (node: HTMLCanvasElement): Dimensions => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
})
