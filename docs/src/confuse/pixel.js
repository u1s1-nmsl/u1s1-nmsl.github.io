import {amess, pix} from './common.js'

// 像素混淆
export default ({data, width, height, factor}, {key}) => {
  const rx = amess(width, key)
  const ry = amess(height, key)
  const core = ([j, i]) => {
    // 横向第一次混淆
    const a = rx[j % width]
    // 横向第二次混淆
    const b = rx[(a + i) % width]
    
    // 纵向第一次混淆
    const c = ry[b % height]
    // 纵向第二次混淆
    const d = ry[(c + j) % height]
    
    const e = i + j * width
    const f = b + d * width
    return [e, f]
  }
  return pix({data, width, height, factor}, core)
}
