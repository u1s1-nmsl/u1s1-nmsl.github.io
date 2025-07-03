import {gilbert2d, pix} from './common.js'

// 小番茄混淆
export default ({data, width, height, factor}) => {
  const size = width * height
  // 偏移量
  const offset = Math.round(size * (Math.sqrt(5) - 1) / 2)
  const curve = gilbert2d(width, height)
  const core = ([i, j]) => {
    const a = i + j * width
    const b = (a + offset) % size
    const [c, d] = curve[a]
    const [e, f] = curve[b]
    const g = c + d * width
    const h = e + f * width
    return [h, g]
  }
  return pix({data, width, height, factor}, core)
}


