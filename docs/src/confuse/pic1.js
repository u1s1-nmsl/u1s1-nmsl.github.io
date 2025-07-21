import {logistic, pix} from './common.js'


// 兼容PicEncrypt:行模式
export default ({data, width, height, factor}, {key}) => {
  const address = logistic(key, 1, width)[0]
  
  const core = ([i, j]) => {
    // 横向第一次混淆
    const m = address[j]
    
    const x = j + i * width
    const y = m + i * width
    return [x, y]
  }
  return pix({data, width, height, factor}, core)
}
