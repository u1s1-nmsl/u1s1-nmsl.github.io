import {logistic, pix} from './common.js'

// 兼容PicEncrypt:行+列模式
export default ({data, width, height, factor}, {key}) => {
  const col = logistic(key, height, width)
  const row = logistic(key, width, height)
  
  const core = ([i, j]) => {
    // 第一次混淆取横坐标
    const n = row[j][i]
    // 第二次混淆取纵坐标
    const m = col[n][j]

    const x = j + i * width
    const y = m + n * width
    return [x, y]
  }
  return pix({data, width, height, factor}, core)
}
