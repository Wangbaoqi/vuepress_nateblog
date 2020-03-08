---
type: web-framework
tag: framework
lang: zh
excerpt: 'framework mind'
---

# 前端框架

::: tip
现在基本所有的前端开发都会采用框架来进行开发，那为什么要使用框架呢?
:::

## 框架的好处

以前没有框架的时候，前端页面基本都是由服务端来处理的，而渲染是采用的各种的模板引擎。而这种模式随着现在技术的更新，业务的完善以及用户体验的提高，基本上快被弃用了。由此各种的框架由此产生，比如，现在使用最高的React、Vue以及angular，但是，使用他们能够解决什么问题呢?

* 组件化
* 强大的开源社区
* 强大的第三方插件
* 拥有各种工具帮助解决问题

看似这些特性都能算是使用框架的原因，但是，这只是使用框架的好处，其真正解决的问题是什么呢?

**解决了UI和状态同步的问题**

在没有框架的时代，要重新更新页面，必须要操作DOM，这就意味着要达到页面更新，必须要损失一定程度的性能损耗，除此之外，在代码维护以及扩展性就变的异常困难了。

在使用框架中，是怎么解决这个问题的呢 举例： 

当状态改变后，映射出对应DOM的虚拟DOM，最终映射改变真实DOM，达到view层重新渲染


## 框架架构模式

架构模式是采用多种设计模式来改进代码结构的方式。实现软件设计的低耦合高内聚（降低模块间的复杂度，每个模块尽可能完成自己的功能）

框架模式产生的过程

1. 前后端不分的时代，前端代码由后端生成发送到浏览器（服务器渲染），最先采用的MVC模式，前端只是view层
2. 随着ajax的产生，前端有了获取数据的能力，不在依赖于服务器渲染
3. 随着前端的发展，用户体验的提升，前端也需要生成视图，处理大量的逻辑，导致前端的MVC、MVP以及MVVM模式的产生


## MVC架构模式

![mvc](https://cdn.img.wenhairu.com/images/2020/03/04/moOLD.png)


如图，箭头代表事件调用，圆箭头代表事件通知


Model层: 
* 用来封装数据以及处理数据的方式，数据变化通知view层
* model和view之间使用观察者模式，view注册监听model，更新view

View层:
* 数据的展示
* view和controller之间使用策略模式，view通过controller实例，实现特定的相应策略

Controller层:
* model和view之间的纽带，响应机制封装在controller层

简单实现MVC模式的demo，[测试地址](https://wangbaoqi.github.io/nateCase/mvcFront/mvc.html)

```js
// Model层 
// 数据封装、操作数据以及使用观察者模式
function Model() {
  var val = 0;
  this.add = function() {
    val++
  }
  this.getVal = function() {
    return val
  }

  // 观察者模式
  var views = []
  // 将观察者存入数组
  this.regist = function(view) {
    views.push(view)
  }
  // 通知view更新
  this.notify = function() {
    for(var i = 0; i < views.length; i++) {
      if(views[i].render) {
        views[i].render(this)
      }
    }
  }
}
// View 层 
// 页面显示 以及使用策略模式 
function View(controller) {
  var $show = document.getElementById('show')
  var $btn = document.getElementById('btn')

  this.render = function(model) {
    $show.innerText = model.getVal()
  }
  // view 和 controller之间使用策略模式，将Controller的方法绑定到元素的事件上
  $btn.onclick =  controller.add
}
// Controller层
// 初始化数据 
function Controller() {
  var model = null;
  var view = null;

  this.init = function() {
    model = new Model();
    view = new View(this);
    model.regist(view);
    view.render(model);
  }
  this.add = function() {
    model.add()
    model.notify()
  }
}

(function(){
  var controller = new Controller()
  controller.init()
})()
```

**使用MVC的弊端**

* 维护成本高。当页面复杂的时候，存在多个view，同时也要更新对应的model和Controller层
* 复用性差。同一套model层到代码，并不能满足多种页面渲染的方式
* 数据流混乱。改变model的同时，view层的更新触发了另一个Controller，使得另一个model又改变了

而随着这些问题的出现，MVP模式随之面世了。

## MVP模式架构

![mvc](https://cdn.img.wenhairu.com/images/2020/03/05/m7VI3.png)

如图, 跟MVC模式不同，model层跟view之间没有任何联系了，而所有的操作都放在了Presenter中


Model层:
* 仍然是封装数据和处理数据的方法
* view的更新不依赖于model，model负责管理数据
* model处理完数据将结果告知presenter

View层:
* 仍然是页面展示
* view和Presenter之间采用观察者模式以及策略模式


Presenter层:
* 作为model和view的中间人，除了逻辑操作外，还有同步数据


简单实现MVP模式的demo，[测试地址](https://wangbaoqi.github.io/nateCase/mvpFront/index.html)

```js
function Model() {
  var val = 0;
  this.add = function() {
    val++
  }
  this.getVal = function() {
    return val
  }
}

function View() {
  var $show = document.getElementById('show')
  var $btn = document.getElementById('btn')

  // 渲染页面
  this.render = function(model) {
    $show.innerText = model.getVal()
  }

  this.init = function() {
    var present = new Presenter(this)
    
    // 策略模式
    $btn.onclick =  present.add
  }
}

function Presenter(view) {
  var _model = new Model();
  var _view = view;

  // 初始化渲染
  _view.render(_model)

  
  this.add = function() {
    _model.add()
    _view.render(_model)
  }
}

(function(){
  var view = new View()
  view.init()
})()
```

**使用MVP的弊端**

MVP模式虽然将view和model解耦了，解决了MVC模式弊端中的2、3点，但是presenter中还是要同时兼顾view和model的问题并没有得到解决:

* Presenter中有大量的手动操作代码，使得Presenter变得很臃肿
* Presenter要处理多个视图，不好维护

## MVVM架构模式 

![mvvm](https://cdn.img.wenhairu.com/images/2020/03/05/m73bp.png)

如图，MVVM将数据同步化，MVP中的Presenter是手动进行数据同步，MVVM中则是采用数据绑定进行同步数据

Model层:
* 只关注数据本身，没有任何数据动作，数据处理交给VM 

View层:
* 通过模板语法将数据渲染进DOM，通过数据绑定与Model进行数据同步 

ViewModel层:
* 除了实现业务逻辑之外，主要就是数据绑定，Presenter中的手动操作变成了VM中的数据绑定绑定来做

双向数据绑定:
* 实现view和model的同步自动化 Vue（数据劫持+观察者模式），angular（脏检查）

实现简易的MVVM架构模式[测试地址]()

```js
// observer 监听每个数据 
function observe(data) {
  if(!data || data === 'undefined' || typeof data !== 'object') return 

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, val) {
  observe(val)
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    set(newVal) {
      val = newVal
      console.log('changed value');
    },
    get() {
      return val
    }
  })
}
```