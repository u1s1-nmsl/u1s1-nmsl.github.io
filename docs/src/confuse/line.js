import {amess, pix} from './common.js'

// 行像素混淆
export default ({data, width, height, factor}, {key}) => {
  const rx = amess(width, key)
  const core = ([i, j]) => {
    // 横向第一次混淆
    const a = rx[i % width]
    // 横向第二次混淆
    const b = rx[(a + j) % width]
    
    const e = j + i * width
    const f = b + i * width
    return [e, f]
  }
  return pix({data, width, height, factor}, core)
}
