---
type: web-vue
tag: Vue
lang: zh
excerpt: 'Vue 组件化开发'
---

# Vue 组件化开发


## 组件的分类

1. 通用组件 - 基础组件，UI组件，比如form表单，弹框，布局
2. 业务组件 - 复用组件，抽奖，摇一摇
3. 页面组件 - 不会复用


## 组件开发

1. 注册
2. 使用
3. 组件间通信
4. 扩展组件 - 插槽

### 组件间的通信

组件之间的通信有很多种，也有不同场景和业务适用的的方式；通信的方式也不同，父子组件、兄弟组件、跨组件

#### props方式

这种方式是常用的方式，有静态和动态之分, 使用v-bind:xx(:xx), props是属于单向数据流，组件不能更改，只能有父组件更改，通过$emit('customEvent', params)的方式来更改

```js
props: ['value'];
props: {
  value: {
    type: String,
    default: ''
  }
}
// $emit way
this.$emit('change', this.value);
```

#### $parent/$children 
使用 $parent/$children 来访问父组件或者子组件的实例，获取数据或者更改数据

::: tip
在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。
:::


#### $refs

$refs 尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 ref 特性为这个子组件赋予一个 ID 引用

```html
<base-input ref="nameInput"></base-input>
```
可以使用：
```js
this.$refs.nameInput
```

::: tip
$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs
::: 

#### $emit/$on

$emit 向上抛出自定义事件以及所带参数，$on 则监听这个自定义事件，回调函数接受参数处理其逻辑

```js
this.$emit('change', 'wangbaoqi')

this,$on('change', value => console.log(value))
```

#### provide/inject

provide/inject 主要为高阶插件/组件库提供用例，不推荐用在业务代码中

```js
// index.vue
export default {
  provide() {
    // provide the instance to child component w-form-item
    return {
      form: this
    }
  },
}
// indexitem.vue
export default {
  inject: ['from']
}
```

## 实现一个高阶组件 - Form表单
Form表单类似于 UI库element UI中的表单 包含校验（async-validator）

表单组件功能以及组件分层：
1. Form 最外层调用方 负责整体定义校验规则
2. Formitem 负责显示错误信息
3. Input 负责双向绑定
4. provide/inject 进行内部数据共享


### WForm 外层调用实现

外层template 调用方式以及数据传递
```html
<!-- index.vue -->
<w-form ref="wform" :model="rulesForm" :rules="rules">
  <w-form-item prop="name" label="username">
    <w-input type="text" v-model="rulesForm.name" placeholder="Username"></w-input>
  </w-form-item>
  <w-form-item prop="pwd" label="password">
    <w-input type="password" v-model="rulesForm.pwd" placeholder="password"></w-input>
  </w-form-item>
  <w-form-item >
    <button @click="submit">submit</button>
  </w-form-item>
</w-form>
```

外层数据定义以及处理

```js
// 逻辑层处理
import WForm from '@/components/help/WForm'
import WFormItem from '@/components/help/WFormItem'
import WInput from '@/components/help/WInput'
export default {
  components: { WForm, WFormItem, WInput },
  data() {
    return {
      rulesForm: {
        name: '',
        pwd: ''
      },
      // rules 校验规则 async-validate 使用
      rules: {
        name: [
          { required: true, message: 'please input name'},
          { min: 6, max: 10, message: 'plase input 6-10 chars'}
        ],
        pwd: { required: true, message: 'please input pwd'}
      }
    }
  },
  methods: {
    submit() {
      // 通过ref 获取子组件实例中的methods
      this.$refs.wform.validate(valid => {
        if(valid) {
          alert('true')
        }else {
          alert('false')
          return false
        }
      })
    }
  }
}
```
### WForm 实现

使用插槽来承载传入的组件
```html
<template>
  <div class="w-form">
    <form >
      <slot></slot>
    </form>
  </div>
</template>
```

```js
export default {
  provide() {
    // provide the instance to child component w-form-item
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {
      filed: []
    }
  },
  created() {
    this.$on('validateAdd', item => this.filed.push(item))
  },
  methods: {
    // 记录所有得验证 点击按钮进行所有的验证 
    async validate(cb) {
      console.log(this.filed);
      const tasks = this.filed.map(item => item.validate());

      const ret = await Promise.all(tasks)
      let result = true;
      for(let re of ret) {
        if(!re) {
          result = false;
        }
      }
      cb(result)
    }
  }
}
```

### WFormItem 实现

WFormItem 主要是用来显示验证错误信息的 以及验证每个formitem的正确性

```html
<template>
  <div class="w-form-item">
    <label v-if="label">{{label}}</label>
    <div class="input-slot">
      <slot></slot>
    </div>
    <p v-if="errcode == 0">{{errmes}}</p>
  </div>
</template>
```

```js
import schema from "async-validator";
export default {
  // inject the attribute from parent instance
  inject: ["form"],
  props: ["label", "prop"],
  data() {
    return {
      errcode: 1,
      errmes: ""
    };
  },
  created() {
    console.log("fromItem created");
    this.$on("validate", this.validate);
  },
  mounted() {
    if (this.prop) {
      this.$parent.$emit("validateAdd", this);
    }
  },
  methods: {
    validate(value) {
      return new Promise(resolve => {
        const descripter = {
          [this.prop]: this.form.rules[this.prop]
        };
        const validator = new schema(descripter);
        const validateParams = {
          [this.prop]: this.form.model[this.prop]
        };
        validator.validate(validateParams, error => {
          if (error) {
            this.errcode = 0;
            this.errmes = error[0].message;
            resolve(false)
          } else {
            this.errcode = 1;
            this.errmes = "";
            resolve(true)
          }
        });
      });
    }
  }
};
```

### WInput 实现 

实现双向绑定

```html
<template>
  <div class="w-input">
    <input :type="type" :value="iValue" :placeholder="placeholder" @input="wInput" @blur="wBlur">
  </div>
</template>
```


```js
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      iValue: this.value
    }
  },
  methods: {
    wCommon(e) {
      this.iValue = e.target.value;
      // notice parent component the value changes
      this.$emit('input', this.iValue);
      // TODO problem the how get correct parent component
      this.$parent.$emit('validate', this.iValue)
    },

    // input event 
    wInput(e) {
      this.wCommon(e);
    },
    wBlur(e) {
      this.wCommon(e);
    }
  }
}
```


