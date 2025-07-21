import {amess, pix} from './common.js'

// 方块混淆
export default ({data, width, height, factor}, {key, sx, sy}) => {
  // 块混淆索引数组
  const rx = amess(sx, key)
  const ry = amess(sy, key)
  
  // 块大小(必须整除)
  const ssx = width / sx
  const ssy = height / sy
  
  const core = ([i, j]) => {
    // 计算当前像素所属块 以及像素在块内的索引
    const by = ((i / ssy) | 0)
    const bx = ((j / ssx) | 0)
    const oy = i % ssy
    const ox = j % ssx
    // 横向第一次混淆
    const a = rx[by % sx]
    // 横向第二次混淆
    const b = rx[(bx + a) % sx]
    // 纵向第一次混淆
    const c = ry[b % sy]
    // 纵向第二次混淆
    const d = ry[(by + c) % sy]
    // 还原块索引
    const m = b * ssx + ox
    const n = d * ssy + oy
    const p = m + n * width
    
    const o = j + i * width
    return [o, p]
  }
  return pix({data, width, height, factor}, core)
}