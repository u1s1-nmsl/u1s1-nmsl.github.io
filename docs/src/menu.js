import confuse from './confuse/index.js'
import phantom from './phantom/index.js'
import wild from './wild/index.js'
import folder from './folder/index.js'


const buttons = [
  {text: '图片混淆', action: confuse},
  {text: '幻影坦克', action: phantom},
  {text: '兽音译者', action: wild},
  {text: '图片文件夹', action: folder}
]

const container = document.createElement('div')
container.style.display = 'flex'
container.style.minHeight = '100vh'
container.style.margin = '0'
container.style.padding = '0'

const sidebar = document.createElement('div')
sidebar.style.width = '200px'
sidebar.style.color = 'white'
sidebar.style.backgroundColor = '#333'
sidebar.style.display = 'flex'
sidebar.style.flexDirection = 'column'
sidebar.style.padding = '10px 0'
sidebar.style.transition = 'width 0.3s'

const toggle = document.createElement('div')
toggle.textContent = '⮜'
toggle.style.padding = '10px 20px'
toggle.style.cursor = 'pointer'
toggle.style.userSelect = 'none'
toggle.style.fontWeight = 'bold'
toggle.style.textAlign = 'right'


const main = document.createElement('div')
main.style.flex = '1'
main.style.padding = '20px'

const items = document.createElement('div')

buttons.map(({text, action}) => {
  const item = document.createElement('div')
  item.textContent = text
  item.style.padding = '10px 20px'
  item.style.cursor = 'pointer'
  item.style.whiteSpace = 'nowrap'
  item.style.overflow = 'hidden'
  item.style.textOverflow = 'ellipsis'
  item.onmouseenter = () => item.style.backgroundColor = '#444'
  item.onmouseleave = () => item.style.backgroundColor = ''
  item.onclick = () => {
    main.firstChild && main.removeChild(main.firstChild)
    action(main)
  }
  return item
})
.reduce((a, b) => (a.append(b), a), items)

sidebar.append(toggle, items)



let collapsed = false

toggle.onclick = () => {
  collapsed = !collapsed
  if (collapsed) {
    sidebar.style.width = '60px'
    toggle.textContent = '⮞'
    items.style.display = 'none'
  } else {
    sidebar.style.width = '200px'
    toggle.textContent = '⮜'
    items.style.display = ''
    
  }
}

container.append(sidebar, main)

export default dom => dom.append(container)