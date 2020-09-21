---
type: web-topic
subType: oneTopic
subTag: React相关
tag: 壹题攻克
lang: zh
---

# React灵魂之问-react
::: tip
collect React interview soul questions
:::

[[toc]]


## 什么是声明式编程

**声明式编程**强调的是要**做什么**，注重的是结果，具体怎么做是由机器去做

**命令式编程**强调的是**如何做**，注重的是过程，命令机器该如何的去执行code

```js
const list = [1,2,4,5,6]
// 声明式编程 - 要做什么 list每一项*2
const declara = list.map(i => i * 2)
// 命令式编程 - 如何做 获取list每一项 然后再*2 最后push
const order = []
for(let i = 0; i < list.length; i++) {
  order.push(list[i] * 2)
}
```

## 什么是函数式编程

**函数式编程是声明式编程的一部分**，它是模拟了人类的思维方式，关注结果，比如上个数组的例子，如果是命令式的方式，就需要处理每一步，关注过程，而函数式编程是声明式编程，关注结果。而处理的过程可以当做是一个通用的函数，可以复用。因此，[函数式编程](/front/javascript/intermediate/JS函数式编程.html)是React的精髓


## React设计思路

1. react是一个用于构建用户界面的JavaScript的轻量库。
2. 遵循声明式编程和函数式编程。
3. 组件设计模式。
4. 虚拟DOM使得DOM更新变的高效


## React15/16.x的区别


## Props和State

**Props:** 组件的的参数，任何传入到组件的值都在这个对象中，它是只读的，不能修改其值

**State:** 组件自身的状态，可以修改其值，只能由自身的组件修改它



## 重新渲染Render会做些什么以及哪些方法会触发render

render()方法是react-DOM暴露的api, 详细讨论[组件的声明周期-render](/everyday/reactConquered/reactComponent.html#对react生命周期的理解)

```js
ReactDOM.render(
  <Home/>,
  document.getElementById('app')
)

// Home 
class Home extends Component {
  render() {
    return <div>this is react component<div/>
  }
}
```

**触发render的方法**

1. 设置状态 setState()
2. props 更改的时候
3. shouldComponentUpdate() return false

## React中setState

问题: setState 真的是异步的么？

带着这个问题，看下setState的原理

```js
// 改变state
handleActive() {
  // this.setState((preState, preProps) => ({
  //   active: preState.active + 1
  // }))
  this.setState({
    active: this.state.active + 1
  })
  console.log(this.state.active, 'first'); // 0

  this.setState({
    active: this.state.active + 1
  })
  console.log(this.state.active, 'second'); // 0

  setTimeout(() => {
    this.setState({
      active: this.state.active + 1
    })
    console.log(this.state.active, 'third'); // 2

    this.setState({
      active: this.state.active + 1
    })
    console.log(this.state.active, 'four'); // 3
  }, 0)
}
```

通过上述打印，提前看下结论：
1. setState 在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout中是“同步的”


## setState为什么默认是异步


## setState什么时候是同步的


## react中应用样式表


## 什么是错误边界



## 遇到性能问题一般在哪个生命周期里解决













