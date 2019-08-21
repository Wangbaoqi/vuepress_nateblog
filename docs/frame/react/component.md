# react 组件化


## 容器组件 VS 展示组件

基本原则： 容器组件负责数据获取。展示组件根据props显示信息

优势：
1. 如何工作和如何展示分离
2. 重用性高
3. 更高的可用性
4. 更易用测试

```js
// CommentList 父组件组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          {name: 'react', content: 'react components'},
          {name: 'vue', content: 'vue components'}
        ]
      })
    }, 1000)
  }
  render() {
    return (
      <div>
        {
          this.state.comments.map((v, i) => (
            // <Comment key={i} data={v}></Comment>
            <Comment key={i} {...v}></Comment>
          ))
        }
      </div>
    )
  }
}
```
组件CommentList的state comments 每隔一秒更新一次，组件Comment中的状态也会跟着变化，如果数据一致，就没有必要再次渲染Comment了，也就可以使用生命周期函数了 shouldComponentUpdate


```js
// 子组件
class Comment extends Component {
  // 可以使用PureComponent 代替
  shouldComponentUpdate(nextProps) {
    if(nextProps.data.name === this.props.data.name) {
      return false
    }
    return true
  }
  render() {
    console.log('render')
    const { name, content} = this.props
    return (
      <div>
        {name} - {content}
      </div>
    )
  }
}
```


## PureComponent

定制了shouldComponentUpdate后的component --- 浅比较 

```js
class comp extends React.PureComponent {
  // TODO
}
```
改造上个组件Comment 

```js
// 使用PureComponent
class Commentp extends React.PureComponent {
  render() {
    const { name, content} = this.props
    return (
      <div>
        {name} - {content}
      </div>
    )
  }
}
```
**原则**

* 确保数据类型是值类型
* 如果是引用类型，确保地址不变，或者确保不是深层次的嵌套 

**解决深层嵌套的方法：** 解套 {...obj}


## React.memo

React v16.6.0 之后的版本 可以使用一个新功能 React.memo来完美React 组件。让函数式的组件，也有了PureComponent的功能



## 组件复合 

