---
type: web-topic
subType: oneTopic
subTag: React相关
lang: zh
tag: 壹题攻克
---


# React灵魂之问-react组件
::: tip
collect React-component interview soul questions
::: 

[[toc]]

## 什么是组件设计模式



## 对react组件的理解 



## 对react生命周期的理解


**组件挂载**

1. **<u>constructor()</u>**
2. <u>static getDerivedStateFromProps()</u>
3. **<u>render()</u>**
4. **<u>componentDidMount()</u>**

嵌套组件之间的声明周期调用顺序: （忽略 getDerivedStateFromProps）

render() **父组件**  => render() **子组件** => componentDidMount() **子组件** => componentDidMount() **父组件**

**组件更新**

1. <u>static getDerivedStateFromProps()</u>
2. **<u>shouldComponentUpdate()</u>**
3. **<u>render()</u>**
4. <u>getSnapshotBeforeUpdate()</u>
5. **<u>componentDidUpdate()</u>**

嵌套组件之间的声明周期调用顺序: （忽略 getDerivedStateFromProps, getSnapshotBeforeUpdate）

shouldComponentUpdate() **父组件** => render() **父组件** => shouldComponentUpdate() **子组件** => render() **子组件** => componentDidUpdate()  **子组件** =>  componentDidUpdate() **父组件**

**组件卸载**

组件从DOM中移除的时候

**<u>componentWillUnmount()</u>**

**错误处理**
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法

1. <u>static getDerivedStateFromError()</u>
2. <u>componentDidCatch()</u>


**v1 弃用的钩子函数**

* componentWillMount()
* componentWillReceiveProps()
* componentWillUpdate()

## 什么是PropTypes

## 组件的不同类型

## 什么是Fragment


## 什么是传送门(Portals)


## React组件中怎么做事件代理


## React组件事件代理的原理

## React怎么做数据的检查和变化


## React中Dom结构发生变化后内部经历了哪些变化


## Key的作用，为何不用index
**（重绘）**


## React异步渲染的概念，介绍Time、Slicing和Suspense


## PureComponent和FunctionComponent区别


React 挂载的时候有 3 个组件，TextComponent、ComposeComponent、DomComponent，区别和关系，Dom 结构发生变化时怎么区分 Data 的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理

## shouldComponentUpdate解决了什么


## 如何解决Props层级过深的问题

## 高阶组件和普通组件有什么区别






