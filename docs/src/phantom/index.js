import core from './core.js'


// 元素声明
const style = document.createElement('style')
const canvas = document.createElement('canvas')
const file = document.createElement('input')
const img2 = document.createElement('img')
const img1 = document.createElement('img')
const div3 = document.createElement('div')
const div2 = document.createElement('div')
const div1 = document.createElement('div')
const div0 = document.createElement('div')

// 元素结构
div3.append(style, canvas)
div2.append(img1, img2)
div1.append(file)
div0.append(div1, div2, div3)

// 元素设置
style.textContent = 'canvas:hover { background: black }'

file.type = 'file'
file.multiple = true
file.accept = 'image/*'

file.onchange = ({target: {files: [f1, f2]}}) => {
  if(!f1 || !f2){
    alert('请上传两张图')
    return 
  }
  
  const ctx = canvas.getContext('2d')
  
  // 并行处理两张图
  Promise.all([
    new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = ({target: {result: url}}) => {
        img1.src = url
        img1.onload = () => resolve()
      }
      reader.readAsDataURL(f1)
    }),
    new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = ({target: {result: url}}) => {
        img2.src = url
        img2.onload = () => resolve()
      }
      reader.readAsDataURL(f2)
    })
  ])
  // 将结果合并渲染进画布
  .then(() => {
    const {width: w1, height: h1} = img1
    const {width: w2, height: h2} = img2
    const w = Math.min(w1, w2)
    const h = Math.min(h1, h2)
    
    canvas.width = w
    canvas.height = h
    
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img1, 0, 0)
    const front = ctx.getImageData(0, 0, w, h).data
    
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img2, 0, 0)
    const back = ctx.getImageData(0, 0, w, h).data
    
    const data = new ImageData(new Uint8ClampedArray(core(front, back)), w, h)
    ctx.putImageData(data, 0, 0)
  })
}

const main = document.createElement('div')

const title = document.createElement('div')
title.textContent = '幻影坦克'
title.style.marginBottom = '20px'

main.append(title, div0)

export default dom => dom.append(main)