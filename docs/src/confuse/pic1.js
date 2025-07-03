import {logistic, pix} from './common.js'


// 兼容PicEncrypt:行模式
export default ({data, width, height, factor}, {key}) => {
  const address = logistic(key, 1, width)[0]

  const core = ([i, j]) => {
    const m = address[i]
    const x = i + j * width
    const y = m + j * width
    return [x, y]
  }
  return pix({data, width, height, factor}, core)
}
