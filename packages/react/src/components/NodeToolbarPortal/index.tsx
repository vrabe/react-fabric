import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { useStore } from '../../hooks/useStore'
import type { ReactFabricState } from '../../types/store'

const selector = (state: ReactFabricState) => state.domNode?.querySelector('.react-fabric__canvas')

interface Props {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const NodeToolbarPortal = forwardRef<HTMLDivElement, Props>(({ children, className, onClick }, forwardRef) => {
  const wrapperRef = useStore(selector)
  const containerRef = useRef<HTMLDivElement>()

  // 使用 useCallback 创建稳定的 ref 回调
  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== containerRef.current) {
        containerRef.current = node || undefined

        if (typeof forwardRef === 'function') {
          forwardRef(node)
        } else if (forwardRef) {
          forwardRef.current = node
        }
      }
    },
    [forwardRef],
  )

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.remove()
        containerRef.current = undefined
      }
    }
  }, [])

  // 如果已经有 container 或没有 wrapper，直接返回
  if (!wrapperRef || containerRef.current) {
    return containerRef.current ? createPortal(children, containerRef.current) : null
  }

  // 创建 DOM 元素
  const div = document.createElement('div')
  div.className = twMerge('react-fabric__portal', className)
  if (onClick) {
    div.addEventListener('click', e => {
      e.stopPropagation()
      onClick(e as any)
    })
  }
  wrapperRef.appendChild(div)
  refCallback(div)

  return createPortal(children, div)
})

export default NodeToolbarPortal
