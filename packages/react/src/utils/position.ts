/**
 * 判断sunPosition是否在parentPosition内
 * @param parentPosition 父级位置 (格式: x1,y1,x2,y2,x3,y3,x4,y4)
 * @param sunPosition 子级位置 (格式: x1,y1,x2,y2,x3,y3,x4,y4)
 * @returns boolean
 */
const includes = (parentPosition: string | number[], sunPosition: string | number[]) => {
  if (!parentPosition || !sunPosition) return false

  // 转换为数组
  const parentPoints = Array.isArray(parentPosition) ? parentPosition : parentPosition.split(',').map(Number)
  const sunPoints = Array.isArray(sunPosition) ? sunPosition : sunPosition.split(',').map(Number)

  // 验证坐标点数量
  if (parentPoints.length !== 8 || sunPoints.length !== 8) return false

  // 转换为数字并解构
  const [x1, y1, x2, y2, x3, y3, x4, y4] = parentPoints.map(Number)
  const [x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s] = sunPoints.map(Number)

  return x1s >= x1 && y1s >= y1 && x2s <= x2 && y2s >= y2 && x3s <= x3 && y3s <= y3 && x4s >= x4 && y4s <= y4
}

export default includes
