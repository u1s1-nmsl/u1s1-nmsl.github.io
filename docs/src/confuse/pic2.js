import {logistic, pix} from './common.js'

// 兼容PicEncrypt:行+列模式
export default ({data, width, height, factor}, {key}) => {
  const col = logistic(key, height, width)
  const row = logistic(key, width, height)
  
  const core = ([i, j]) => {
    const n = row[i][j]
    const m = col[n][i]
    const x = i + j * width
    const y = m + n * width
    return [x, y]
  }
  return pix({data, width, height, factor}, core)
}
