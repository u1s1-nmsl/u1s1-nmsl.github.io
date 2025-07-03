import {amess, pix} from './common.js'

// 行像素混淆
export default ({data, width, height, factor}, {key}) => {
  const x = amess(width, key)
  const y = amess(height, key)
  const core = ([i, j]) => {
    const a = (x[j % width] + i) % width
    const b = x[a]
    
    const d = j
    
    const e = i + j * width
    const f = b + d * width
    return [e, f]
  }
  return pix({data, width, height, factor}, core)
}
