---
type: web-react
tag: reactJs
excerpt: 'React 开发中采坑问题收集...'
---

# React 开发中采坑问题收集

## React.js 开发问题

1. **index.js:1 Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.**

问题来源： 

```js
// 嵌套会有问题 警告
<Link to=''>
  <Link to=''>嵌套</Link>
</Link>
```