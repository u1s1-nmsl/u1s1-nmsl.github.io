// 默认加密字典
const defaultMap = ['嗷', '呜', '啊', '~']
// 加密
const enc = (data, map = defaultMap) => {
  const values = [...data].values()
    // 获取unicode码
    .map(value => value.codePointAt(0))
    // 拆分为4位
    .map(num => [(num >> 12) & 0xf, (num >> 8) & 0xf, (num >> 4) & 0xf, (num >> 0) & 0xf])
    .flatMap(i => i)
    // 变形一下
    .map((num, index) => index + num)
    // 拆分为2位
    .map(num => [((num & 0xf) >> 2) & 0x3, ((num & 0xf) >> 0) & 0x3])
    .flatMap(i => i)
    // 取字典
    .map(index => map[index])
    .toArray()
    // 拼接
    .join('')
    
  return `${map[3]}${map[1]}${map[0]}${values}${map[2]}` 
}

// 解密
const dec = (data) => {
  const map = {
    [data.at(0)]: 3,
    [data.at(1)]: 1,
    [data.at(2)]: 0,
    [data.at(-1)]: 2
  }
  
  return data.slice(3, -1)
    // 八个一组
    .match(/.{1,8}/g)
    .values()
    // 还原
    .map((values, i) =>
      values.match(/.{1,2}/g)
        .values()
        .map(a => Array.from(a).map(b => map[b]))
        .map(([a, b], j) => (((a << 2) + b - (i * 4 + j) & 0xf) & 0xf) << (3 - j) * 4)
        .reduce((a, b) => a + b)
    )
    // 还原
    .map(value => String.fromCodePoint(value))
    .toArray()
    // 拼接
    .join('')
}

export default {enc, dec}