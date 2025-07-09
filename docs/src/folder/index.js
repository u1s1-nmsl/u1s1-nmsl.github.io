import folder from './folder.js'
import picture from './picture.js'

// 创建元素
const style = document.createElement('style')
const details1 = document.createElement('details')
const summary1 = document.createElement('summary')

const encryptDetails1 = document.createElement('details')
const encryptSummary1 = document.createElement('summary')
const encryptContainer1 = document.createElement('div')
const encryptLeft1 = document.createElement('div')
const encryptLabel11 = document.createElement('label')
const encryptInput11 = document.createElement('input')
const encryptLabel12 = document.createElement('label')
const encryptInput12 = document.createElement('input')
const encryptBtn1 = document.createElement('button')
const encryptBtn2 = document.createElement('button')
const encryptRight1 = document.createElement('div')
const encryptTest1 = document.createElement('div')

const decryptDetails1 = document.createElement('details')
const decryptSummary1 = document.createElement('summary')
const decryptContainer1 = document.createElement('div')
const decryptLeft1 = document.createElement('div')
const decryptLabel1 = document.createElement('label')
const decryptInput1 = document.createElement('input')
const decryptTextarea1 = document.createElement('textarea')
const decryptBtn1 = document.createElement('button')
const decryptBtn2 = document.createElement('button')
const decryptRight1 = document.createElement('div')
const decryptTest1 = document.createElement('div')

const details2 = document.createElement('details')
const summary2 = document.createElement('summary')

const encryptDetails2 = document.createElement('details')
const encryptSummary2 = document.createElement('summary')
const encryptContainer2 = document.createElement('div')
const encryptLeft2 = document.createElement('div')
const encryptLabel21 = document.createElement('label')
const encryptInput21 = document.createElement('input')
const encryptLabel22 = document.createElement('label')
const encryptInput22 = document.createElement('input')
const encryptBtn3 = document.createElement('button')
const encryptBtn4 = document.createElement('button')
const encryptRight2 = document.createElement('div')
const encryptTest2 = document.createElement('div')

const decryptDetails2 = document.createElement('details')
const decryptSummary2 = document.createElement('summary')
const decryptContainer2 = document.createElement('div')
const decryptLeft2 = document.createElement('div')
const decryptLabel2 = document.createElement('label')
const decryptInput2 = document.createElement('input')
const decryptTextarea2 = document.createElement('textarea')
const decryptBtn3 = document.createElement('button')
const decryptBtn4 = document.createElement('button')
const decryptRight2 = document.createElement('div')
const decryptTest2 = document.createElement('div')

// 设置属性
style.textContent = `
.paste-textarea {
  width: 250px;
  height: 100px;
  margin-top: 5px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 15px;
  font-family: inherit;
  resize: none;
  background-color: #f8f8f8;
  color: #666;
  display: block;
}

.paste-textarea:hover {
  border-color: #999;
}

.paste-textarea:focus {
  outline: none;
  border-color: #0066ff;
  background-color: #e6f0ff;
}

`
encryptDetails1.style.margin = encryptDetails2.style.margin = decryptDetails1.style.margin = decryptDetails2.style.margin = '10px 0 10px 20px'

details1.style.padding = details2.style.padding = '5px'
details1.style.border = details2.style.border = '1px solid #ccc'

summary1.textContent = '图夹1'
summary2.textContent = '图夹2'
summary1.style.cursor = summary2.style.cursor = 'pointer'
summary1.style.fontWeight = summary2.style.fontWeight = 'bold'

encryptSummary1.textContent = encryptSummary2.textContent = '做图'
encryptSummary1.style.cursor = encryptSummary2.style.cursor = 'pointer'

encryptContainer1.style.display = encryptContainer2.style.display = 'flex'
encryptContainer1.style.margin = encryptContainer2.style.margin = '10px 0 10px 20px'
encryptLeft1.style.flex = encryptLeft2.style.flex = '0 1 auto'
encryptRight1.style.flex = encryptRight2.style.flex = '0 1 auto'

encryptLabel11.textContent = '封面图：'
encryptLabel21.textContent = '封面图(gif)：'
encryptLabel11.style.display = encryptLabel12.style.display = encryptLabel21.style.display = encryptLabel22.style.display = 'block'
encryptLabel11.style.marginBottom = encryptLabel12.style.marginBottom = encryptLabel21.style.marginBottom = encryptLabel22.style.marginBottom = '10px'
encryptInput11.type = encryptInput12.type = encryptInput21.type = encryptInput22.type = 'file'
encryptInput11.accept = 'image/*'
encryptInput21.accept = 'image/*'//'image/gif'
encryptInput12.multiple = encryptInput22.multiple = true
encryptLabel12.textContent = encryptLabel22.textContent = '多文件：'

encryptBtn1.textContent = encryptBtn3.textContent = '执行'
encryptBtn2.textContent = encryptBtn4.textContent = '清空'

decryptSummary1.textContent = decryptSummary2.textContent = '解图'
decryptSummary1.style.cursor = decryptSummary2.style.cursor = 'pointer'

decryptContainer1.style.display = decryptContainer2.style.display = 'flex'
decryptContainer1.style.margin = decryptContainer2.style.margin = '10px 0 10px 20px'
decryptLeft1.style.flex = decryptLeft2.style.flex = '0 1 auto'
decryptRight1.style.flex = decryptRight2.style.flex = '0 1 auto'

decryptLabel1.textContent = '上传图：'
decryptLabel2.textContent = '本地图：'
decryptLabel1.style.display = decryptLabel2.style.display = 'block'
decryptLabel1.style.marginBottom = decryptLabel2.style.marginBottom = '10px'
decryptInput1.type = decryptInput2.type = 'file'
decryptInput1.accept = decryptInput2.accept = 'image/*'

decryptTextarea1.className = decryptTextarea2.className = 'paste-textarea'
decryptTextarea1.readOnly = decryptTextarea2.readOnly = true
decryptTextarea1.textContent = decryptTextarea2.textContent = '点击此处Ctrl+V粘贴'

decryptBtn1.textContent = decryptBtn3.textContent = '执行'
decryptBtn2.textContent = decryptBtn4.textContent = '清空'

encryptBtn2.style.margin = encryptBtn4.style.margin = decryptBtn2.style.margin = decryptBtn4.style.margin = '0 0 0 5px'
encryptRight1.style.margin = encryptRight2.style.margin = decryptRight1.style.margin = decryptRight2.style.margin = 'auto'

const registry = new FinalizationRegistry((url) => URL.revokeObjectURL(url))
const encrypt = async (f1, f2, r1, pack) => {
  const [cover] = f1.files
  if(!cover){
    alert('请上传封面')
    return
  }
  const files = f2.files
  if(files.length === 0) {
    alert('至少上传一个文件')
    return
  }
  
  const file = await pack(cover, files)
  r1.replaceChildren()
  const preview = document.createElement('img')
  const url = URL.createObjectURL(file)
  preview.src = url
  preview.onload = () => URL.revokeObjectURL(url)
  r1.append(preview)
}

const show = (files, r1) => {
  const ol = files.values()
    .map(file => {
      if(/\.url$/i.test(file.name)){
        // 链接
        const text = decoder.decode(file.data)
        const match = text.match(/【图夹视频】🖼️(.+?)\s*；\s*💾(.+?)\s*；/)
        if(match && match[1] && match[2]){
          const [_, tu, du] = match
          const div = document.createElement('div')
          const a = document.createElement('a')
          const img = document.createElement('img')
          div.textContent = '｜👉点击这里：'
          a.href = du
          a.textContent = '🔗 访问直链'
          img.src = tu
          div.append(a, img)
          return div
        } else {
          const span = document.createElement('img')
          span.textContent = '无效的URL文件格式'
          return span
        }
      } else if(/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.name)){
        const url = URL.createObjectURL(file)
        const img = document.createElement('img')
        img.style = 'max-width: 500px; max-height: 500px; object-fit: contain;'
        img.src = url
        img.onload = () => URL.revokeObjectURL(url)
        return img
      } else if(/\.(mp4|webm|ogg|mov)$/i.test(file.name)){
        const url = URL.createObjectURL(file)
        const video = document.createElement('video')
        video.controls = true
        video.src = url
        registry.register(video, url)
        return video
      }
      
    })
    .filter(Boolean)
    .map(dom => {
      const li = document.createElement('li')
      li.append(dom)
      return li
    })
    .reduce((a, b) => (a.append(b), a), document.createElement('ul'))
  r1.replaceChildren()
  r1.append(ol)
}

const decoder = new TextDecoder()
const decrypt = async (f1, r1, unpack) => {
  const [f] = f1.files
  if(!f){
    alert('请上传图夹')
    return
  }
  const files = await unpack(f)
  show(files, r1)
}

const paste = async ({clipboardData: {items}}, r1, unpack) => {
  if (!items || items.length === 0) return alert('无法从剪贴板项获取图片文件。')
  const image = Array.from(items).find(({type, kind}) => kind === 'file' && type.startsWith('image/'))
  if (!image) return alert('无法从剪贴板项获取图片文件。')
  const blob = image.getAsFile()
  if (!blob) return alert('无法从剪贴板项获取图片文件。')
  const files = await unpack(blob)
  show(files, r1)
}

encryptBtn1.onclick = () => encrypt(encryptInput11, encryptInput12, encryptTest1, folder.pack)
encryptBtn3.onclick = () => encrypt(encryptInput21, encryptInput22, encryptTest2, picture.pack)

encryptBtn2.onclick = () => encryptTest1.replaceChildren()
encryptBtn4.onclick = () => encryptTest2.replaceChildren()

decryptBtn1.onclick = () => decrypt(decryptInput1, decryptTest1, folder.unpack)
decryptBtn3.onclick = () => decrypt(decryptInput2, decryptTest2, picture.unpack)

decryptBtn2.onclick = () => decryptTest1.replaceChildren()
decryptBtn4.onclick = () => decryptTest2.replaceChildren()

decryptTextarea1.onpaste = e => paste(e, decryptTest1, folder.unpack)
decryptTextarea2.onpaste = e => paste(e, decryptTest2, picture.unpack)


// 组合结构
encryptLabel11.append(encryptInput11)
encryptLabel12.append(encryptInput12)
encryptLeft1.append(encryptLabel11, encryptLabel12, encryptBtn1, encryptBtn2)
encryptRight1.append(encryptTest1)
encryptContainer1.append(encryptLeft1, encryptRight1)
encryptDetails1.append(encryptSummary1, encryptContainer1)

decryptLabel1.append(decryptInput1)
decryptLeft1.append(decryptLabel1, decryptBtn1, decryptBtn2, decryptTextarea1)
decryptRight1.append(decryptTest1)
decryptContainer1.append(decryptLeft1, decryptRight1)
decryptDetails1.append(decryptSummary1, decryptContainer1)

details1.append(summary1, encryptDetails1, decryptDetails1)

encryptLabel21.append(encryptInput21)
encryptLabel22.append(encryptInput22)
encryptLeft2.append(encryptLabel21, encryptLabel22, encryptBtn3, encryptBtn4)
encryptRight2.append(encryptTest2)
encryptContainer2.append(encryptLeft2, encryptRight2)
encryptDetails2.append(encryptSummary2, encryptContainer2)

decryptLabel2.append(decryptInput2)
decryptLeft2.append(decryptLabel2, decryptBtn3, decryptBtn4, decryptTextarea2)
decryptRight2.append(decryptTest2)
decryptContainer2.append(decryptLeft2, decryptRight2)
decryptDetails2.append(decryptSummary2, decryptContainer2)

details2.append(summary2, encryptDetails2, decryptDetails2)

document.body.append(details1, details2)






const div0 = document.createElement('div')
div0.append(style, details1, details2)


const main = document.createElement('div')

const title = document.createElement('div')
title.textContent = '图片文件夹'
title.style.marginBottom = '20px'

main.append(title, div0)

export default dom => dom.append(main)