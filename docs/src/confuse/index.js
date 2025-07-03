import block from './block.js'
import line from './line.js'
import pixel from './pixel.js'
import pic1 from './pic1.js'
import pic2 from './pic2.js'
import hilbert from './hilbert.js'


const sx = 32
const sy = 32
// 元素声明
const model0 = document.createElement('option')
const model1 = document.createElement('option')
const model2 = document.createElement('option')
const model3 = document.createElement('option')
const model4 = document.createElement('option')
const model5 = document.createElement('option')
const model = document.createElement('select')
const modelP = document.createElement('p')
const modelL = document.createElement('label')

const file = document.createElement('input')
const fileP = document.createElement('p')
const fileL = document.createElement('label')

const key = document.createElement('input')
const keyP = document.createElement('p')
const keyL = document.createElement('label')

const group = document.createElement('div')
const enc = document.createElement('button')
const dec = document.createElement('button')
const reset = document.createElement('button')
const clear = document.createElement('button')
const groupL = document.createElement('label')
const groupP = document.createElement('p')

const left = document.createElement('div')

const workD = document.createElement('details')
const workS = document.createElement('summary')
const work = document.createElement('canvas')
const workF = document.createElement('fieldset')
const workL = document.createElement('legend')

const originD = document.createElement('details')
const originS = document.createElement('summary')
const origin = document.createElement('canvas')
const originF = document.createElement('fieldset')
const originL = document.createElement('legend')

const right = document.createElement('div')
const container = document.createElement('div')

// 元素结构
model.append(model0, model1, model2, model3, model4, model5)
modelL.append(modelP, model)

fileL.append(fileP, file)
keyL.append(keyP, key)
group.append(enc, dec, reset, clear)
groupL.append(groupP, group)

left.append(modelL, fileL, keyL, groupL)
workF.append(workL, work)
originF.append(originL, origin)
workD.append(workS, workF)
originD.append(originS, originF)
right.append(originD, workD)
container.append(left, right)

// 公共区域
const content = '? x ?'
const pre = () => {
  // 方块混淆需要预处理
  if(model.value !== '0') {
    return
  }
  const {width: w, height: h} = work
  if(w % sx === 0 || h % sy === 0){
    return
  }
  alert(`方块混淆必须设置宽为${sx}的整数倍、高为${sy}的整数倍`)
  const width = w - (w % sx) + sx
  const height = h - (h % sy) + sy
  return writeToWork([origin, width, height])
}
const cipher = factor => {
  enc.disabled = dec.disabled = reset.disabled = clear.disabled = true
  const {width, height} = work
  const data = wCtx.getImageData(0, 0, width, height).data
  const res = [block, line, pixel, pic1, pic2, hilbert][model.value]({data, width, height, factor}, {key: key.value, sx, sy})
  wCtx.reset()
  wCtx.putImageData(new ImageData(new Uint8ClampedArray(res), width, height), 0, 0)
  enc.disabled = dec.disabled = reset.disabled = clear.disabled = false
}

const wCtx = work.getContext('2d', { willReadFrequently: true })
const oCtx = origin.getContext('2d', { willReadFrequently: true })

const writeToOrigin = image => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = ({target: {result: src}}) => resolve(src)
    reader.readAsDataURL(image)
  })
  .then(src => new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  }))
  .then(img => {
    origin.width = img.width
    origin.height = img.height
    oCtx.reset()
    oCtx.drawImage(img, 0, 0, origin.width, origin.height)
    return [origin, origin.width, origin.height]
  })
}

const writeToWork = ([org, width, height]) => {
    work.width = width
    work.height = height
    wCtx.reset()
    wCtx.drawImage(org, 0, 0, work.width, work.height)
    workL.textContent = `${work.width} x ${work.height}`
    workD.open = true
    originD.open = false
}


// 元素属性
origin.onpaste = work.onpaste = ({clipboardData: {items}}) => {
  if (!items || items.length === 0) return alert('无法从剪贴板项获取图片文件。')
  const image = Array.from(items).find(({type, kind}) => kind === 'file' && type.startsWith('image/'))
  if (!image) return alert('无法从剪贴板项获取图片文件。')
  const blob = image.getAsFile()
  if (!blob) return alert('无法从剪贴板项获取图片文件。')
  writeToOrigin(blob).then(writeToWork)
}

file.onchange = ({target: {files: [image]}}) => {
  if(image){
    writeToOrigin(image).then(writeToWork)
  } else {
    alert('选择本地图片')
  }
}
model.onchange = ({target: {value}}) => {
  switch (parseInt(value)) {
    case 0:
    case 1:
    case 2: key.disabled = false, key.value = ''; break
    case 3:
    case 4: key.disabled = false, key.value = '0.666'; break
    case 5: key.value = '无需秘钥', key.disabled = true
  }
}

enc.onclick = () => (pre(), cipher(true))
dec.onclick = () => (pre(), cipher(false))
reset.onclick = () => writeToWork([origin, origin.width, origin.height])
clear.onclick = () => {
  work.width = 300
  work.height = 150
  workL.textContent = content
  wCtx.reset()
}


workL.textContent = content
originL.textContent = '点击框内直接粘贴'

model0.selected = true
model0.textContent = '方块混淆'
model1.textContent = '行像素混淆'
model2.textContent = '像素混淆'
model3.textContent = '兼容PicEncrypt:行模式'
model4.textContent = '兼容PicEncrypt:行+列模式'
model5.textContent = '小番茄混淆'
model0.value = 0
model1.value = 1
model2.value = 2
model3.value = 3
model4.value = 4
model5.value = 5

modelP.textContent = '模式：'
groupP.textContent = '操作:'
fileP.textContent = '原图:'
keyP.textContent = '秘钥:'
file.accept = 'image/*'
file.type = 'file'
key.title = '输入秘钥'
key.placeholder = '输入秘钥'
originS.textContent = '原图'
workS.textContent = '画布'
workD.open = false
originD.open = true
container.style = 'display: flex; gap: 10px;'
left.style = 'flex-basis: 200px;'
right.style = 'flex-basis: auto;'
origin.tabIndex = work.tabIndex = '0'

enc.textContent = '加密'
dec.textContent = '解密'
reset.textContent = '重置'
clear.textContent = '清空'

export default dom => dom.append(container)
