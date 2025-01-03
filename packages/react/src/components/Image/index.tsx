import type { ImageProps as FabricImageProps, ObjectEvents, SerializedImageProps, Canvas } from 'fabric'
import { FabricImage } from 'fabric'
import type { Group as BaseGroup } from 'fabric'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import { useDidUpdate } from '../../hooks/useDidUpdate'
import { useStoreApi } from '../../hooks/useStore'

export type Handle = {
  instance: FabricImage | undefined
}

export type ImageProps = Partial<FabricImageProps> & {
  src: string
  group?: BaseGroup
  onLoad?: (imageSource: FabricImage<Partial<ImageProps>, SerializedImageProps, ObjectEvents>) => void
}

const Image = forwardRef<Handle, ImageProps>(({ group, src, onLoad, ...options }, ref) => {
  const instanceRef = useRef<FabricImage>()
  const onLoadRef = useRef(onLoad)
  const store = useStoreApi()
  const optionsRef = useRef(options)

  // 更新 onLoadRef
  useEffect(() => {
    onLoadRef.current = onLoad
    optionsRef.current = options
  })

  // 只在 src 改变时初始化 image
  useEffect(() => {
    const { canvas } = store.getState()
    if (!canvas?.getElement()) return

    const parent = group ?? canvas

    FabricImage.fromURL(src, { crossOrigin: 'anonymous' }).then(imageSource => {
      instanceRef.current = imageSource
      imageSource.set(optionsRef.current)
      onLoadRef.current?.(imageSource)
      parent.add(imageSource)
    })

    return () => {
      if (instanceRef.current) {
        parent?.remove(instanceRef.current)
      }
    }
  }, [src, store, group]) // 只包含初始化需要的依赖

  // 只在 options 更新时执行
  useDidUpdate(() => {
    const { canvas } = store.getState()

    if (instanceRef.current) {
      instanceRef.current.set(options)
      instanceRef.current.setCoords()
      canvas?.requestRenderAll()
    }
  }, [options, store])

  useImperativeHandle(ref, () => ({
    instance: instanceRef.current,
  }))

  return null
})

export default memo(Image)
