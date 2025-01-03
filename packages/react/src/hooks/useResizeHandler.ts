import { throttle } from 'lodash-es'
import { useCallback, useEffect } from 'react'
import { useStore } from './useStore'

const useResizeHandler = () => {
  const { domNode, canvas, setDimensions } = useStore(state => ({
    domNode: state.domNode,
    canvas: state.canvas,
    setDimensions: state.setDimensions,
  }))

  const updateDimensions = useCallback(() => {
    if (!domNode || !canvas) return

    // 获取父容器的尺寸
    const { width, height } = domNode.getBoundingClientRect()

    // 使用 store 中的 setDimensions 方法
    setDimensions({ width, height })

    // canvas.requestRenderAll()
  }, [domNode, canvas, setDimensions])

  useEffect(() => {
    if (!domNode || !canvas) return

    // 初始化时立即计算一次
    updateDimensions()
    const throttledUpdate = throttle(updateDimensions, 200, {
      leading: true,
      trailing: true,
    })

    window.addEventListener('resize', throttledUpdate)
    const resizeObserver = new ResizeObserver(throttledUpdate)
    resizeObserver.observe(domNode)

    return () => {
      window.removeEventListener('resize', throttledUpdate)
      resizeObserver.disconnect()
      throttledUpdate.cancel()
    }
  }, [updateDimensions, domNode, canvas])
}

export default useResizeHandler
