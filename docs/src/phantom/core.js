/**
* 入参 rgba扁平数组 [r, g, b, a, r, g, b, a, ...]
* 出参 同上
*/ 
export default (front, back) => {
  // 4个一组切割
  return Array.from({length: front.length / 4}, (_, i) => i)
    .map(i => {
      const j = i * 4
      const r1 = front[j]
      const g1 = front[j + 1]
      const b1 = front[j + 2]
      const r2 = back[j]
      const g2 = back[j + 1]
      const b2 = back[j + 2]
      
      // 去除色差
      const x1 = (r1 + g1 + b1) / 3
      const x2 = (r2 + g2 + b2) / 3
      // 变亮
      const x3 = x1 / 2 + 127
      // 变暗
      const x4 = x2 / 2
      // 透明度
      const a = Math.max(x4 - x3 + 255, 1)
      // 最终值
      const x5 = x4 * 255 / a
      
      return [x5, x5, x5, a]
    })
    .flat()
}