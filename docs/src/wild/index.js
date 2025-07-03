import wild from './core.js'

// 创建容器
const container = document.createElement('div')
container.style.display = 'flex'
container.style.gap = '20px'
container.style.margin = '0'
container.style.fontFamily = 'Arial, sans-serif'

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

// 组装所有元素
container.append(div1, div2, div3)

// 添加按钮事件
decrypt.onclick = () => left.value && (right.value = wild.dec(left.value))

encrypt.onclick = () => right.value && (left.value = wild.enc(right.value))

const main = document.createElement('div')

const title = document.createElement('div')
title.textContent = '兽音译者'
title.style.marginBottom = '20px'

main.append(title, container)
export default dom => dom.append(main)