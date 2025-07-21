import {gilbert2d, pix} from './common.js'

// 小番茄混淆
export default ({data, width, height, factor}) => {
  const size = width * height
  // 偏移量
  const offset = Math.round(size * (Math.sqrt(5) - 1) / 2)
  // 加密数组
  const curve = gilbert2d(width, height)
  const core = ([i, j]) => {
    // 偏移前位置
    const a = j + i * width
    // 偏移后位置
    const b = (a + offset) % size
    // 偏移前坐标
    const [c, d] = curve[a]
    // 偏移后坐标
    const [e, f] = curve[b]
    // 偏移前真实位置
    const g = c + d * width
    // 偏移后真实位置
    const h = e + f * width
    return [h, g]
  }
  return pix({data, width, height, factor}, core)
}


