## vue3
<img loop="" src="../../../.vuepress/public/img/spring.gif" width="100%" height="100%"  >
</img>

## setup 

- setup：新的 option，所有的组合 API 函数都在此使用

  ::: demo

  ```vue
  <div class="hello">{{ msg }}</div>
  <el-button @click="log('props')">props</el-button>
  <el-button @click="log('context')">context</el-button>
  <el-button @click="log('context')">instance</el-button>
  <script>
      import { defineComponent ,toRefs, getCurrentInstance } from 'vue'
      export default defineComponent({
          props: {
              title: {
                  type: String,
                  default: "vue3",
              },
          },
          setup(props, context) {
              //组合api入口函数，只会触发一次
              //如果返回对象，可以在模板中使用
              //无法访问data、computed、methods、模板refs
              const msg= "Hello vue3";
              const {attrs} =context//包括attrs、emit、slots属性
              //console.log(props.title)
              const { title } = toRefs(props)//使用toRefs解构保持响应性
              //没有this,可以通过getCurrentInstance获取实例
              const instance= getCurrentInstance()//VueComponent
              const log=(type)=>{
                  console.log(eval(type))
              }
              return { msg,log };
          },
      })
  </script>
  ```

  :::

- setup script语法糖

  ```vue
  <div>
      <input @input="change($event)" :value="user" />
      {{user}}
  </div>
  <script lang="ts" setup>
      import { ref, useSlots, defineProps, useAttrs } from "vue";  
      //defineEmit,defineProps,defineExpose定义属性、事件...,useContext弃用
      const user = ref("小明");//不需要return
      function change(e: Event) {
          user = e.target.value;
      }
      const solt:Object =useSlots()//获取插槽
      console.log(solt.default())
      console.log(useAttrs())//获取属性与事件
  </script>
  ```
  
- defineExpose

  ```vue
  <script setup lang="ts">
  //子组件
  const method=()=>{}
  //使用 <script setup> 的组件是默认关闭的,不会暴露任何在 <script setup> 中声明的绑定。
  defineExpose({
    method
  })
  ```

## 响应式

- ref：定义一个基本类型响应式数据

  ::: demo

  ```vue
  <div>
      {{ count }}
      <el-button @click="count++">加1</el-button>
      <!-- 模板中不需使用.value写法 -->
      <el-button @click="add">加1</el-button>
  </div>
  <script>
      import { ref } from "vue";
      export default {
          name: "hello",
          setup() {
              let a = 0; //此时a不是响应式的
              let count = ref(a);//依然是靠object.defineProperty()的get与set完成的
              function add() {
                  count.value++;// 通过xxx.value操作数据
              }
              return {
                  count,
                  add,
              }
          }
      }
  </script>
  ```

  :::

- reactive:接收普通对象，返回该对象的响应式代理对象

  ::: demo

  ```vue
  <div>
      {{ `${user.name} is ${user.age}` }}
      <p>性别：{{ user.sex }}</p>
  <el-button @click="update">更新数据</el-button>
  </div>
  <script>
      import { ref, reactive } from "vue";
      export default {
          name: "hello",
          setup() {
              const obj= {
                  name: "Tom",
                  age: 18,
              };
              let user = reactive(obj);//使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据。
              //返回Proxy代理对象
              function update() {
                  user.name = "牛夫人"
                  user.age=19
                  user.sex = "女"
                  //需要使用代理对象更新属性值
              }
              return { user,update }
          },
      }
  </script>
  ```
  :::

+ toRef

  ```vue
  <template>
    {{ refCount }}
  </template>
  
  <script setup lang="ts">
  import { reactive, toRef } from "vue";
  const state = reactive({
    count: 1,
  })
  const refCount = toRef(state, 'count')//转换单个属性
  refCount.value++
  </script>
  ```

- toRefs

  ::: demo

  ```vue
  <template>
  <div>
      <img :src="img" style='width:100px'/>
      <p>{{ author }}</p>
      <p>{{ name }}</p>
      </div>
  <div id="ipt"></div>
  </template>
  <script>
      import { toRefs, reactive, h, nextTick, onMounted } from "vue";
      export default {
          setup() {
              const book = reactive({
                  author: "HcySunYang",
                  name: "Vue.js设计与实现",
                  img: "https://img3.jarhu.com/goodimg/202202/151/di1644900399702.jpg",
              });
              //直接解构并不是响应式的
              let { author, name, img } = toRefs(book); //toRefs保持响应式
              const render = h("input", {
                  value: name.value,
                  onInput: e => {
                      name.value = e.target.value;
                  },
              });
              return { author, name, img };
          },
      };
  </script>
  ```
  :::
- readonly

  ```vue
  <script setup lang="ts">
      import { ref, readonly } from "vue";
  
      const state = readonly<{
          msg: string
      }>({ msg: '123' })
      state.msg='12122'//接受一个对象 (不论是响应式还是一般的) 或是一个 ref，只读属性无法修改
  </script>
  ```
  
## 进阶

+ customRef()


---

## 生命周期钩子

+ 在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

  ::: demo

  ```vue
  <script>
  import { defineComponent,onMounted } from 'vue'
  
  export default defineComponent({
    setup() {
      onMounted(()=>{
        // console.log('Component is mounted!')
      })
    },
  })
  </script>
  ```

  :::

---

## 计算属性

+ 从 Vue 导入的 `computed` 函数

+ 可写的计算属性

---

## 侦听器

+ watch

  ```vue
  <script setup lang="ts">
      import { ref, watch, watchEffect } from 'vue'
      const count = ref(0)
      //依赖源，回调，配置
      const unwatch = watch(count, (n, o) => {
          console.log(n)
      },{
          deep: false,//深层侦听器
          immediate: true,
          flush: 'post'//Vue 更新之后的DOM
      })
  </script>
  ```

+ watchEffect

  ```vue
  <script setup lang="ts">
  import { ref, watch, watchEffect } from 'vue'
  const age = ref(18)
  const name = ref('zs')
  age.value++
  const unwatch = watchEffect(() => {
    console.log(age.value, name.value)//立即执行，不需要指定状态,追踪多个依赖
  })
  </script>
  ```

---

## 组件传值

+ prop/emit

  ```vue
  <template>
  <!-- 父组件 -->
  <Son :msg='msg' @change='change' />
  </template>
  
  <script setup lang="ts">
      import { ref } from 'vue'
      import Son from './components/Son.vue'
      const msg = ref('msg')
      const change = (param: string) => {
          console.log(param)
      }
  </script>
  ```

  ```vue
  <script setup lang="ts">
      //子组件
      import { defineProps, defineEmits, toRefs } from 'vue'
      const props = defineProps(['msg'])
      const { msg } = toRefs(props)
      console.log(msg.value)
      const emits = defineEmits(['change'])
      emits('change', 'son message')
  </script>
  ```

+ provide/inject

  ```vue
  <script setup lang="ts">
      //祖先组件
      import { ref, provide } from 'vue'
      import Son from './components/Son.vue'
      const name = ref('name')
      const age = ref(18)
      provide('info', {
          name,age
      })
  </script>
  ```

  ```vue
  <script setup lang="ts">
      //后代组件
      import { inject } from 'vue'
      const info = inject('info')
      console.log(info)
  </script>
  ```

+ attrs/listeners

  ```vue
  <template>
  <!-- 父组件 -->
  <Son @fun='fun' :msg='msg' />
  </template>
  
  <script setup lang="ts">
      import Son from './components/Son.vue'
      import { ref, provide } from 'vue'
      const msg = ref('message')
      const fun = () => {
          console.log('fun')
      }
  </script>
  ```

  ```vue
  <script setup lang="ts">
      //子组件
      import { useAttrs } from 'vue'
      const attrs: any = useAttrs()//获取传来的属性和v-on事件监听器
      console.log(attrs)//Proxy {onFun: ƒ, msg: "message"}
      const { onFun, msg } = attrs//自定义事件有on前缀
      onFun()
  </script>
  ```

+ solt

  ```vue
  <template>
  <!--子组件传递数据-->  
  <slot name="son" msg="son data">default</slot>
  </template>
  ```

  ```vue
  <template>
  <!--父组件使用一个变量接收-->  
  <Son v-slot:son="data">
      {{ data.msg }}
      </Son>
  </template>
  
  <script setup lang='ts'>
      import Son from './components/Son.vue'
  </script>
  ```

+ expose/ref

  ```vue
  <script lang="ts" setup>
      //子组件使用defineExpose暴露属性
      import { ref,defineExpose } from 'vue'
      const a = ref(1)
      const b = ref(2)
      defineExpose({
          a,
          b
      })
  </script>
  ```

  ```vue
  <template>
    <Son ref="son" />
  </template>
  
  <script setup lang='ts'>
  import Son from './components/Son.vue'
  import { nextTick } from 'vue';
  
  const son = ref(null)
  nextTick(() => {
    console.log(son.value)
  })
  </script>
  ```

+ EventBus/mitt

## 渲染函数 & JSX

+ 函数式组件

  ```vue
  <script>
      import { h } from 'vue'
      export default {
          setup(props) {
              //setup钩子可以返回渲染`函数`
              return () => h('h5',{title:"锦瑟"},'此前可待成追忆 只是当时已惘然')//标签/组件，属性，children
          }
      }
  </script>
  ```

+ jsx

  安装插件`@vitejs/plugin-vue-jsx`

  ```js
  //vite.config.js
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import vueJsx from '@vitejs/plugin-vue-jsx'
  
  export default defineConfig({
    plugins: [ vue(),vueJsx({})],
  })
  ```

  在vue中使用

  ```vue
  <script lang="jsx">
      export default {
          setup(props) {
              //lang="jsx"
              return () => <div>阮声落华裳,梅出似点妆</div>
          }
      }
  </script>
  ```

## 模板引用

+ ref

  ::: demo

  ```vue
  <template> 
  <el-button @click='getEl'>ref</el-button>
  <div ref="demo">demo</div>
  </template>
  
  <script>
      import { ref } from 'vue'
      export default{
          setup(){
              const demo = ref(null)// DOM 元素将在初始渲染后分配给 ref
              const getEl = ()=> console.log(demo.value)
              return { demo, getEl }
          }
      }
  
  </script>
  ```
  :::
  
  ---
## 指令

## [pinia](https://pinia.vuejs.org/)

+ 安装

  ```ts
  import { createPinia } from 'pinia'
  import piniaPluginPersist from 'pinia-plugin-persist'
  const pinia = createPinia()
  pinia.use(piniaPluginPersist)//使用数据缓存
  import App from './App.vue'
  const app = createApp(App)
  app.use(pinia)
  ```

+ 定义容器&&数据持久化

  ```ts
  //定义导出容器
  //store/index.ts
  import { defineStore } from 'pinia'
  export const useMainStore = defineStore('main', {//容器id必须唯一，pinia会把容器挂载到根容器
      state: () => {//类似data1.必须是函数：避免服务端渲染数据污染2.必须是箭头函数：更好的TS类型推导
          return { count: 0, name: '星野梦美',arr:[1,2,3] }
      },
      getters: {//有缓存功能
          count10(state) {//使用state有类型推导
              return state.count + 10
          },
          //count10(): number {
          //  return this.count + 10
          //}
      },
      actions: {//类似methods，不能使用箭头函数，this指向变了
          increment() {
              this.count++
          },
      },
      // 开启数据缓存
      persist: {
          enabled: true,
          strategies: [
              {
                  key:'my_user',//默认容器id作为key
                  storage: localStorage,//默认sessionStorage
                  paths: ['count', 'name']//缓存字段
              }
          ]
      }
  })
  ```

+ 使用

  ```vue
  <template>
  <p>{{ count }}</p>
  <p>{{ name }}</p>
  <p>{{ arr }}</p>
  <el-button @click="add"> add</el-button>
  </template>
  <script lang='ts' setup>
      import { useMainStore } from "./store/index";
      const mainStore = useMainStore();
      const { count, name, arr } = storeToRefs(mainStore); //直接解构数据(getters)不是响应式的
      function add() {
          //方式一：直接修改数据
          // mainStore.count++;
  
          //方式二：修改多个数据
          // mainStore.$patch({//修改多个数据建议使用$patch性能优化
          //   count: mainStore.count+1,
          //   name: "凉宫春日",
          //   arr:[...mainStore.arr,mainStore.arr.length+1]
          // });
  
          //方式三
          // mainStore.$patch(state => {
          //   state.count++;
          //   state.name = "凉宫春日";
          //   state.arr.push(arr.value.length+1);
          // });
  
          //方式四:封装action
          mainStore.increment()
      }
  </script>
  ```
  ---