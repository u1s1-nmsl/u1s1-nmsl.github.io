// 加密字典
const md5 = (str) => {

  const rotateLeft = (lValue, iShiftBits) => (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))

  const addUnsigned = (lX, lY) => {
    const lX4 = (lX & 0x40000000)
    const lY4 = (lY & 0x40000000)
    const lX8 = (lX & 0x80000000)
    const lY8 = (lY & 0x80000000)
    const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
    } else {
      return (lResult ^ lX8 ^ lY8)
    }
  }

  const md5ff = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned((b & c) | ((~b) & d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const md5gg = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned((b & d) | (c & (~d)), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const md5hh = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned((b ^ c ^ d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const md5ii = (a, b, c, d, x, s, ac) => {
    a = addUnsigned(a, addUnsigned(addUnsigned((c ^ (b | (~d))), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  const convertToWordArray = (str) => {
    const lWordCount = Math.floor((str.length + 64) / 64)
    const lMessage = new Array(lWordCount * 16).fill(0)
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i)
      lMessage[i >> 2] |= (charCode & 0xFF) << ((i % 4) * 8)
    }
    const lastIndex = str.length
    lMessage[lastIndex >> 2] |= 0x80 << ((lastIndex % 4) * 8)
    lMessage[lWordCount * 16 - 2] = lastIndex * 8

    return lMessage
  }

  const wordToHex = (values) => {
    return Array.from(values)
      .map(value => Array(4).fill(value).map((v, i) => [v, i]))
      .flat()
      .map(([v, i]) => (v >>> (i * 8)) & 0x00FF)
      .map(v => v.toString(16))
      .map(v => v.padStart(2, '0'))
      .join('')
      .toLowerCase()
  }

  const x = convertToWordArray(str)

  let a = 0x67452301
  let b = 0xEFCDAB89
  let c = 0x98BADCFE
  let d = 0x10325476

  for (let k = 0; k < x.length; k += 16) {
    let AA = a
    let BB = b
    let CC = c
    let DD = d

    a = md5ff(a, b, c, d, x[k + 0], 7, 0xD76AA478)
    d = md5ff(d, a, b, c, x[k + 1], 12, 0xE8C7B756)
    c = md5ff(c, d, a, b, x[k + 2], 17, 0x242070DB)
    b = md5ff(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE)
    a = md5ff(a, b, c, d, x[k + 4], 7, 0xF57C0FAF)
    d = md5ff(d, a, b, c, x[k + 5], 12, 0x4787C62A)
    c = md5ff(c, d, a, b, x[k + 6], 17, 0xA8304613)
    b = md5ff(b, c, d, a, x[k + 7], 22, 0xFD469501)
    a = md5ff(a, b, c, d, x[k + 8], 7, 0x698098D8)
    d = md5ff(d, a, b, c, x[k + 9], 12, 0x8B44F7AF)
    c = md5ff(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1)
    b = md5ff(b, c, d, a, x[k + 11], 22, 0x895CD7BE)
    a = md5ff(a, b, c, d, x[k + 12], 7, 0x6B901122)
    d = md5ff(d, a, b, c, x[k + 13], 12, 0xFD987193)
    c = md5ff(c, d, a, b, x[k + 14], 17, 0xA679438E)
    b = md5ff(b, c, d, a, x[k + 15], 22, 0x49B40821)

    a = md5gg(a, b, c, d, x[k + 1], 5, 0xF61E2562)
    d = md5gg(d, a, b, c, x[k + 6], 9, 0xC040B340)
    c = md5gg(c, d, a, b, x[k + 11], 14, 0x265E5A51)
    b = md5gg(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA)
    a = md5gg(a, b, c, d, x[k + 5], 5, 0xD62F105D)
    d = md5gg(d, a, b, c, x[k + 10], 9, 0x2441453)
    c = md5gg(c, d, a, b, x[k + 15], 14, 0xD8A1E681)
    b = md5gg(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8)
    a = md5gg(a, b, c, d, x[k + 9], 5, 0x21E1CDE6)
    d = md5gg(d, a, b, c, x[k + 14], 9, 0xC33707D6)
    c = md5gg(c, d, a, b, x[k + 3], 14, 0xF4D50D87)
    b = md5gg(b, c, d, a, x[k + 8], 20, 0x455A14ED)
    a = md5gg(a, b, c, d, x[k + 13], 5, 0xA9E3E905)
    d = md5gg(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8)
    c = md5gg(c, d, a, b, x[k + 7], 14, 0x676F02D9)
    b = md5gg(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A)

    a = md5hh(a, b, c, d, x[k + 5], 4, 0xFFFA3942)
    d = md5hh(d, a, b, c, x[k + 8], 11, 0x8771F681)
    c = md5hh(c, d, a, b, x[k + 11], 16, 0x6D9D6122)
    b = md5hh(b, c, d, a, x[k + 14], 23, 0xFDE5380C)
    a = md5hh(a, b, c, d, x[k + 1], 4, 0xA4BEEA44)
    d = md5hh(d, a, b, c, x[k + 4], 11, 0x4BDECFA9)
    c = md5hh(c, d, a, b, x[k + 7], 16, 0xF6BB4B60)
    b = md5hh(b, c, d, a, x[k + 10], 23, 0xBEBFBC70)
    a = md5hh(a, b, c, d, x[k + 13], 4, 0x289B7EC6)
    d = md5hh(d, a, b, c, x[k + 0], 11, 0xEAA127FA)
    c = md5hh(c, d, a, b, x[k + 3], 16, 0xD4EF3085)
    b = md5hh(b, c, d, a, x[k + 6], 23, 0x4881D05)
    a = md5hh(a, b, c, d, x[k + 9], 4, 0xD9D4D039)
    d = md5hh(d, a, b, c, x[k + 12], 11, 0xE6DB99E5)
    c = md5hh(c, d, a, b, x[k + 15], 16, 0x1FA27CF8)
    b = md5hh(b, c, d, a, x[k + 2], 23, 0xC4AC5665)

    a = md5ii(a, b, c, d, x[k + 0], 6, 0xF4292244)
    d = md5ii(d, a, b, c, x[k + 7], 10, 0x432AFF97)
    c = md5ii(c, d, a, b, x[k + 14], 15, 0xAB9423A7)
    b = md5ii(b, c, d, a, x[k + 5], 21, 0xFC93A039)
    a = md5ii(a, b, c, d, x[k + 12], 6, 0x655B59C3)
    d = md5ii(d, a, b, c, x[k + 3], 10, 0x8F0CCC92)
    c = md5ii(c, d, a, b, x[k + 10], 15, 0xFFEFF47D)
    b = md5ii(b, c, d, a, x[k + 1], 21, 0x85845DD1)
    a = md5ii(a, b, c, d, x[k + 8], 6, 0x6FA87E4F)
    d = md5ii(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0)
    c = md5ii(c, d, a, b, x[k + 6], 15, 0xA3014314)
    b = md5ii(b, c, d, a, x[k + 13], 21, 0x4E0811A1)
    a = md5ii(a, b, c, d, x[k + 4], 6, 0xF7537E82)
    d = md5ii(d, a, b, c, x[k + 11], 10, 0xBD3AF235)
    c = md5ii(c, d, a, b, x[k + 12], 15, 0x2AD7D2BB)
    b = md5ii(b, c, d, a, x[k + 9], 21, 0xEB86D391)

    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }

  return wordToHex([a, b, c, d])
}


export const amess = (length, key) => {
  return Array.from({length}, (_, i) => i)
    .map(i => `${key}${i}`)
    .map(i => md5(i))
    .map(i => i.substr(0, 7))
    .map(i => parseInt(i, 16))
    .map((v, i) => v % (i + 1))
    .map((v, i) => [v, i])
    .reverse()
    .reduce((a, [v, i]) => ([a[v], a[i]] = [a[i], a[v]], a), Array.from({length}, (_, i) => i))
}

export const logistic = (key, height, width) => {
  const perms = Array(height)
  let x = key
  for (let i = 0; i < height; i++) {
    const vals = Array(width)
    
    vals[0] = [x, 0]
    for (let j = 1; j < width; j++) {
      x = 3.9999999 * x * (1 - x)
      vals[j] = [x, j]
    }

    perms[i] = vals.sort((a, b) => a[0] - b[0]).map(pair => pair[1])
  }
  return perms
}

// 一阶希尔伯特曲线
export const gilbert2d = (width, height) => {
  const result = []
  const stack = []

  if (width >= height) {
    stack.push({ x: 0, y: 0, ax: width, ay: 0, bx: 0, by: height })
  } else {
    stack.push({ x: 0, y: 0, ax: 0, ay: height, bx: width, by: 0 })
  }

  while (stack.length > 0) {
    const { x, y, ax, ay, bx, by } = stack.pop()

    const w = Math.abs(ax + ay)
    const h = Math.abs(bx + by)

    const [dax, day] = [Math.sign(ax), Math.sign(ay)]
    const [dbx, dby] = [Math.sign(bx), Math.sign(by)]

    if (h === 1) {
      let px = x
      let py = y
      for (let i = 0; i < w; i++) {
        result.push([px, py])
        px += dax
        py += day
      }
      continue
    }

    if (w === 1) {
      let px = x
      let py = y
      for (let i = 0; i < h; i++) {
        result.push([px, py])
        px += dbx
        py += dby
      }
      continue
    }

    let [ax2, ay2] = [Math.floor(ax / 2), Math.floor(ay / 2)]
    let [bx2, by2] = [Math.floor(bx / 2), Math.floor(by / 2)]

    const w2 = Math.abs(ax2 + ay2)
    const h2 = Math.abs(bx2 + by2)

    if (2 * w > 3 * h) {
      if ((w2 % 2) && (w > 2)) {
        ax2 += dax
        ay2 += day
      }

      stack.push({ x: x + ax2, y: y + ay2, ax: ax - ax2, ay: ay - ay2, bx, by })
      stack.push({ x, y, ax: ax2, ay: ay2, bx, by })

    } else {
      if ((h2 % 2) && (h > 2)) {
        bx2 += dbx
        by2 += dby
      }

      stack.push({ x: x + (ax - dax) + (bx2 - dbx), y: y + (ay - day) + (by2 - dby), ax: -bx2, ay: -by2, bx: -(ax - ax2), by: -(ay - ay2) })
      stack.push({ x: x + bx2, y: y + by2, ax, ay, bx: bx - bx2, by: by - by2 })
      stack.push({ x, y, ax: bx2, ay: by2, bx: ax2, by: ay2 })
    }
  }

  return result
}

// 加密流程
export const pix = ({data, width, height, factor}, core) => {
  // 反过来就是解密
  const ass = factor? (i) => i: ([i, j]) => [j, i]
  return Array.from({length:width}, (_, i) => i)
    .map(i => Array.from({length: height}, (_, j) => [i, j]))
    .flat()
    // 核心变换
    .map(core)
    // 反转变换
    .map(ass)
    // 实际坐标
    .map(([i, j]) => [4 * i, 4 * j])
    .reduce((a, [i, j]) => ([a[i], a[i+1], a[i+2], a[i+3]] = [data[j], data[j+1], data[j+2], data[j+3]], a), [])
}