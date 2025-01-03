import type { CanvasEvents, GroupEvents, ObjectEvents } from 'fabric'
import type { AllCanvasEvents } from '../types/canvas'
import type { AllObjectEvents } from '../types/object'

export const bindEvents = <T extends CanvasEvents | ObjectEvents | GroupEvents>(
  target: any,
  listeners: Partial<T extends CanvasEvents ? AllCanvasEvents : AllObjectEvents>,
) => {
  const cleanup: (() => void)[] = []

  Object.entries(listeners).forEach(([key, handler]) => {
    if (handler) {
      const rawEventName = key
        .slice(2)
        .replace(/[A-Z]/g, (match, offset) =>
          offset === 0 ? match.toLowerCase() : ':' + match.toLowerCase(),
        ) as keyof T

      target.on(rawEventName, handler)
      cleanup.push(() => target.off(rawEventName, handler))
    }
  })

  return () => cleanup.forEach(fn => fn())
}
