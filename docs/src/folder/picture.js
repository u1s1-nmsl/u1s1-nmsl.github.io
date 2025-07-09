const limiters = ['|||ENCRYPT_DELIMITER|||', '|||FILENAME_DELIMITER|||', '|||FILE_DELIMITER|||']
const encoder = new TextEncoder()
const decoder = new TextDecoder()

// 打包图片
const pack = (cover, files, code = limiters) => {
  const many = [cover, ...files].map(file => file.arrayBuffer().then(buffer => [new Uint8Array(buffer), file.name, file.type]))
  return Promise.all(many).then(([c, ...f]) => enc(c, f, code))
}
// 解包图片
const unpack = (file, code = limiters) => {
  return file.arrayBuffer()
    .then(buffer => new Uint8Array(buffer))
    .then(arr => dec(arr, code))
}

const enc = ([cover, filename, type], files, code) => {
  const [de, fn, fd] = code.map(i => encoder.encode(i))
  const f = files.map(([name, content]) => [fn, name, fn, fd, content]).flat()
  const result = [cover, de, ...f]
  const size = result.values().map(i => i.length).reduce((a, b) => a + b)
  const u8 = new Uint8Array(size)
  let offset = 0
  for (const arr of result) {
      u8.set(arr, offset)
      offset += arr.length
  }
  return new File([u8.buffer], filename, {type})
}
// 找寻文件块
const match = (arr, from, pattern) => {
  for (let i = from; i <= arr.length - pattern.length; i++) {
    let ok = true
    for (let j = 0; j < pattern.length; j++) {
      if (arr[i + j] !== pattern[j]) {
        ok = false
        break
      }
    }
    if (ok) return i
  }
  return -1
}
function* chunks(arr, code) {
  const [de, fn, fd] = code.map(i => encoder.encode(i))
  let offset = 0
  // 先匹配de
  const index = match(arr, offset, de)
  if (index === -1) return
  offset = index + de.length

  while (true) {
    // 匹配第一个fn
    const s = match(arr, offset, fn)
    if (s === -1) return
    
    // 匹配第二个fn
    const e = match(arr, s + fn.length, fn)
    if (e === -1) return
    
    // 两个fn之间的数据组合为文件名
    const name = decoder.decode(arr.slice(s + fn.length, e))
    // 匹配fd
    const b = match(arr, e + fn.length, fd)
    if (b === -1) return

    // 匹配下一个fn
    const o = match(arr, b + fd.length, fn)
    
    if (o === -1) {
      // 匹配不到取fd到数组结尾的数据做文件内容
      const content = arr.slice(b + fd.length)
      yield [content, name]
      return
    } else {
      // 匹配到了就去fd和fn之间的数据做文件内容
      const content = arr.slice(b + fd.length, o)
      yield [content, name]
      offset = o
    }
  }
}

const dec = (file, code) => {
  return chunks(file, code)
    .map(([content, name]) => {
      if(/\.gif$/i.test(name)){
        return new File([content.buffer], name, {type: 'image/gif'})
      }
      if(/\.(jpg|jpeg|png|bmp|webp)$/i.test(name)) {
        return new File([content.buffer], name, {type: 'image/png'})
      }
      if(/\.(mp4|webm|ogg|mov)$/i.test(name)) {
        return new File([content.buffer], name, {type: 'video/mp4'})
      }
      return new File([content.buffer], name, {type: 'application/octet-stream'})
    })
    .toArray()
}

export default {pack, unpack}