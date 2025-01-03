import { computePosition, flip, offset, shift,ComputePositionConfig } from '@floating-ui/core'
import type { FabricObject, FabricObjectProps, TPointerEvent, TPointerEventInfo } from 'fabric'
import { util } from 'fabric'
import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import React from 'react'
import { useStore } from '../../hooks/useStore'
import type { AllObjectEvents } from '../../types/object'
import NodeToolbarPortal from '../NodeToolbarPortal'

/**
 * @desc 不能内置支持 selected , 因为需要 rect 开启 lockMovementX lockMovementY, 这样支持的场景就受限了
 */
export type ControlProps = Partial<AllObjectEvents & FabricObjectProps> & {
  Content: ReactNode
  children: ReactNode
  placement?: ComputePositionConfig['placement']
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnOutsideClick?: boolean
}

const Control = React.forwardRef(
  (
    {
      children,
      className,
      placement = 'bottom',
      open = true,
      onOpenChange,
      closeOnOutsideClick = true,
      Content,
    }: ControlProps,
    forwardRef,
  ) => {
    const instanceRef = useRef<FabricObject | undefined>(undefined)
    const canvas = useStore(state => state.canvas)
    const floatingElRef = useRef<HTMLDivElement>(null)

    // 使用 useCallback 创建稳定的 ref 回调
    const refCallback = useCallback(
      (node: any) => {
        // 只在节点真正改变时更新 ref
        if (node !== instanceRef.current) {
          instanceRef.current = node

          // 处理 forwardRef
          if (typeof forwardRef === 'function') {
            forwardRef(node)
          } else if (forwardRef) {
            forwardRef.current = node
          }
        }
      },
      [forwardRef],
    )

    // 使用 useMemo 缓存克隆的子元素
    const newChildren = useMemo(() => {
      if (React.Children.only(children) && React.isValidElement(children)) {
        return React.cloneElement(children, {
          ref: refCallback,
          ...children.props,
        })
      }
      return children
    }, [children, refCallback]) // 只在 children 或 refCallback 改变时重新克隆

    const updatePosition = useCallback(() => {
      if (!instanceRef.current || !floatingElRef.current || !canvas) {
        return
      }

      // 确保元素已经渲染并且有尺寸
      const floatingRect = floatingElRef.current.getBoundingClientRect()
      if (floatingRect.width === 0 || floatingRect.height === 0) {
        // 如果元素还没有尺寸，等待下一帧再试
        requestAnimationFrame(updatePosition)
        return
      }

      const sceneCoords = instanceRef.current.getCoords()
      const viewportCoords = sceneCoords.map(point => util.sendPointToPlane(point, canvas.viewportTransform, undefined))

      const platform = {
        getElementRects: (data:any) => data,
        getDimensions: (element:any) => element,
        getClippingRect: () => ({
          x: 0,
          y: 0,
          width: canvas.width,
          height: canvas.height,
        }),
      }

      const virtualEl = {
        x: viewportCoords[0].x,
        y: viewportCoords[0].y,
        width: viewportCoords[2].x - viewportCoords[0].x,
        height: viewportCoords[2].y - viewportCoords[0].y,
      }

      computePosition(virtualEl, floatingElRef.current.getBoundingClientRect(), {
        platform,
        placement,
        middleware: [offset(5), flip(), shift({ padding: 5 })],
      }).then(({ x, y }) => {
        if (!floatingElRef.current) return

        Object.assign(floatingElRef.current.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
    }, [canvas, placement])

    // 确保在元素挂载后更新位置
    useEffect(() => {
      if (open) {
        requestAnimationFrame(updatePosition)
      }
    }, [open, updatePosition])

    useEffect(() => {
      canvas?.on('after:render', updatePosition)

      return () => {
        canvas?.off('after:render', updatePosition)
      }
    }, [canvas, updatePosition])

    useEffect(() => {
      const handleCanvasClick = (e: TPointerEventInfo<TPointerEvent>) => {
        // 阻止事件冒泡到 document
        e.e.stopPropagation()
        e.e.preventDefault() // 也阻止默认行为

        // 使用 id 比较来确保正确匹配
        if (e.target === instanceRef.current) {
          onOpenChange?.(!open)
        }
        // 点击其他区域时关闭
        else if (open) {
          onOpenChange?.(false)
        }
      }

      const handleDocumentClick = (e: MouseEvent) => {
        // 如果点击在浮动内容内，不处理
        if (floatingElRef.current?.contains(e.target as Node)) {
          return
        }

        if (closeOnOutsideClick && open) {
          onOpenChange?.(false)
        }
      }

      canvas?.on('mouse:down', handleCanvasClick)
      // 改为冒泡阶段处理 document 事件
      document.addEventListener('mousedown', handleDocumentClick, false)

      return () => {
        canvas?.off('mouse:down', handleCanvasClick)
        document.removeEventListener('mousedown', handleDocumentClick, false)
      }
    }, [canvas, closeOnOutsideClick, onOpenChange, open])

    return (
      <>
        {newChildren}
        {open && (
          <NodeToolbarPortal
            className={twMerge('absolute', className)}
            ref={floatingElRef}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {Content}
          </NodeToolbarPortal>
        )}
      </>
    )
  },
)

export default Control
