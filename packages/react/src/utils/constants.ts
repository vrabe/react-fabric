// 定义位置相关属性的类型
export type UncontrolledProp =
  | 'left'
  | 'top'
  | 'width'
  | 'height'
  | 'scaleX'
  | 'scaleY'
  | 'angle'
  | 'points'
  | 'path'
  | 'originX'
  | 'originY'

// 定义可以非受控的属性
export const UNCONTROLLED_PROPS = [
  'left',
  'top',
  'width',
  'height',
  'scaleX',
  'scaleY',
  'angle',
  'points',
  'path',
  'originX',
  'originY',
] as readonly UncontrolledProp[]

// 定义默认属性的类型
export type DefaultProp = `default${Capitalize<UncontrolledProp>}`

// 生成对应的 default 属性
export const DEFAULT_PROPS = UNCONTROLLED_PROPS.map(
  prop => `default${prop.charAt(0).toUpperCase()}${prop.slice(1)}` as DefaultProp,
) as readonly DefaultProp[]
