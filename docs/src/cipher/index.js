import beast from './beast.js'
import meow from './meow.js'

// 创建左侧文本区域
const div1 = document.createElement('div')

const left = document.createElement('textarea')
left.style.width = '500px'
left.style.height = '500px'
left.style.resize = 'none'
left.style.padding = '10px'
left.style.boxSizing = 'border-box'
left.style.fontSize = '14px'
left.placeholder = '输入密文'

div1.appendChild(left);

// 创建按钮区域
const div2 = document.createElement('div')
div2.style.display = 'flex'
div2.style.flexDirection = 'column'
div2.style.justifyContent = 'center'
div2.style.gap = '20px'

const decrypt = document.createElement('button')
decrypt.textContent = '解密 ⮞'
decrypt.style.padding = '10px 20px'
decrypt.style.cursor = 'pointer'
decrypt.style.fontSize = '16px'

const encrypt = document.createElement('button')
encrypt.textContent = '⮜ 加密'
encrypt.style.padding = '10px 20px'
encrypt.style.cursor = 'pointer'
encrypt.style.fontSize = '16px'

div2.append(decrypt, encrypt)

// 创建右侧文本区域
const div3 = document.createElement('div')

const right = document.createElement('textarea')
right.style.width = '500px'
right.style.height = '500px'
right.style.resize = 'none'
right.style.padding = '10px'
right.style.boxSizing = 'border-box'
right.style.fontSize = '14px'
right.placeholder = '输入明文'

div3.appendChild(right)


// 创建容器
const div0 = document.createElement('div')
div0.style.display = 'flex'
div0.style.gap = '20px'
div0.style.margin = '0'
div0.style.fontFamily = 'Arial, sans-serif'
// 组装所有元素
div0.append(div1, div2, div3)



//---
const fieldset = document.createElement('fieldset')
const legend = document.createElement('legend')
const label0 = document.createElement('label')
const model0 = document.createElement('input')
const label1 = document.createElement('label')
const model1 = document.createElement('input')

fieldset.style.padding = '10px'
legend.textContent = '混淆模式'
model0.type = model1.type = 'radio'
model0.checked = true
model0.name = model1.name = 'selected'
label0.textContent = '兽音译者'
label1.textContent = '喵喵隐者(9.1)'
model0.value = 0
model1.value = 1
label0.style.marginRight = '10px'

label0.prepend(model0)
label1.prepend(model1)
fieldset.append(legend, label0, label1)

const div = document.createElement('div')

div.append(fieldset)
div.style.marginBottom = '20px'

const container = document.createElement('div')
container.append(div, div0)

// 添加按钮事件
decrypt.onclick = () => left.value && (right.value = [beast, meow][[model0, model1].find(radio => radio.checked)?.value].dec(left.value))

encrypt.onclick = () => right.value && (left.value = [beast, meow][[model0, model1].find(radio => radio.checked)?.value].enc(right.value))

const main = document.createElement('div')

const title = document.createElement('div')
title.textContent = '字符串混淆'
title.style.marginBottom = '20px'

main.append(title, container)
export default dom => dom.append(main)