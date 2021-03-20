//基类
class Container {
  constructor() {
    this.children = [],
      this.element = null
  }
  init () {
    throw new Error('请重写init方法')
  }
  add (child) {
    this.children.push(child)
    this.element.appendChild(child.element)
    return this
  }
}
//基于基类创建容器
class CreateDiv extends Container {
  constructor(id, parent) {
    super()
    this.id = id || 'get'
    this.parent = parent
    this.init()
  }
  init () {
    this.element = document.createElement('div')
    this.element.id = this.id
    this.element.onclick = function () {
      // this.style.visibility = "hidden"
      this.style.top = "-50%"

    }
    this.element.style = `
        position: absolute;
        left: 50%;
        top: -50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 300px;
        z-index:10000;
        background-color: #fff;
        -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
        box-shadow: 0px 0px 10px #888888;
        transition: all .5s;
    `
  }
  show () {
    this.parent.appendChild(this.element)
    setTimeout(() => {
      this.element.style.top = "50%"
    }, 30);
  }
}
//Button类
class CreateButton{
  constructor(id, defaultValue) {
    this.id = id || ''
    this.defaultValue = defaultValue || '关闭'
    this.init()
  }
  init () {
    this.element = document.createElement('button')
    this.element.id = this.id || 'search'
    this.element.innerText = this.defaultValue
    this.element.style = `
      position:absolute;
      left:50%;
      bottom:40px;
      transform: translateX(-50%);
    `
  }
}
// img类
//Button类
class CreateImg {
  constructor(id, defaultValue) {
    this.id = id || ''
    this.defaultValue = defaultValue || '关闭'
    this.init()
  }
  init () {
    this.element = document.createElement('button')
    this.element.id = this.id || 'search'
    this.element.innerText = this.defaultValue
    this.element.style = `
      position:absolute;
      left:50%;
      bottom:40px;
      transform: translateX(-50%);
      width:100px;
    `
  }
}
//字体类
class CreateP {
  constructor(id, defaultValue) {
    this.id = id || ''
    this.defaultValue = defaultValue || ''
    this.init()
  }
  init () {
    this.element = document.createElement('p')
    this.element.id = this.id || 'search'
    this.element.innerText = this.defaultValue
    this.element.style = `
      position:absolute;
      left:50%;
      bottom:100px;
      transform: translateX(-50%);
    `
  }
}
var div = new CreateDiv('alertInfo',document.body)
var p = new CreateP('pp','这是你自己，去找别人聊天吧')
var button = new CreateButton('btn')

export default {div,button,p}