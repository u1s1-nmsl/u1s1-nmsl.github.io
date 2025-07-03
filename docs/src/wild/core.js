// 默认加密字典
const defaultMap = ['嗷', '呜', '啊', '~']
// 加密
const enc = (data, map = defaultMap) => {
  const nums = [...data]
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
    
  return [3, 1, 0, ...nums, 2]
    // 取字典
    .map(index => map[index])
    // 拼接
    .join('')
}

// 解密
const dec = (data) => {
  const map = {
    [data.at(0)]: 3,
    [data.at(1)]: 1,
    [data.at(2)]: 0,
    [data.at(-1)]: 2
  }
  return [...data.slice(3, -1)]
    // 还原
    .map(value => map[value])
    // 两个一组
    .reduce((acc, cur, index) => {
      const i = index % 2
      i === 0 && acc.push([])
      acc.at(-1)[i] = cur
      return acc
    }, [])
    // 合并为16进制
    .map(([a, b]) => (parseInt(a) << 2) + parseInt(b))
    // 变形
    .map((num, index) => (num - index) & 0xf)
    // 四个一组
    .reduce((acc, cur, index) => {
      const i = index % 4
      i === 0 && acc.push([])
      acc.at(-1)[i] = cur
      return acc
    }, [])
    // 合并
    .map(([a, b, c, d]) => (a << 12) + (b << 8) + (c << 4) + (d << 0))
    // 还原
    .map(value => String.fromCodePoint(value))
    // 拼接
    .join('')
    
}

export default {enc, dec}