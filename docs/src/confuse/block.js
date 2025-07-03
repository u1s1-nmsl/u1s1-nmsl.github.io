import {amess, pix} from './common.js'

// 方块混淆
export default ({data, width, height, factor}, {key, sx, sy}) => {
  // 入参要求width必须是sx的整数倍 height必须是sy的整数倍
  const x = amess(sx, key)
  const y = amess(sy, key)
  const ssx = width / sx
  const ssy = height / sy
  
  const core = ([i, j]) => {
    const a = (x[((j / ssy) | 0) % sx] * ssx + i) % width
    const b = x[(a / ssx) | 0] * ssx + a % ssx
    
    const c = (y[((b / ssx) | 0) % sy] * ssy + j) % height
    const d = y[(c / ssy) | 0] * ssy + c % ssy
    
    const e = i + j * width
    const f = b + d * width
    return [e, f]
  }
  return pix({data, width, height, factor}, core)
}