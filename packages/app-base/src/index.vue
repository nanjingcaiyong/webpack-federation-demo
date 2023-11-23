<template>
  <div style="border: 1px solid #000;">
    <div>这是基座项目</div>
  </div>
  <div style="border: 1px solid #000;">
    <Project1 :count="count"></Project1>
    <button @click="add">+1</button>
  </div>

  <div style="border: 1px solid #000;">
    <Project2></Project2>
  </div>

  <div style="border: 1px solid #000;">
    <Project3></Project3>
    <Project3ModuleA></Project3ModuleA>
  </div>

  <Project4></Project4>


  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref, provide, reactive, toRefs } from 'vue'
import Project1 from 'app1/AppContainer'; // 子应用使用异步引入组件`import('./main.ts');`，使整个子应用都变成了异步
const Project2 = defineAsyncComponent(() => import('app2/app'))
const Project3 = defineAsyncComponent(() => import('item_three/AppContainer'))
const Project3ModuleA = defineAsyncComponent(() => import('item_three/ModuleA'))
const Project4 = defineAsyncComponent(() => import('app4/AppContainer'))

export default defineComponent({
  components: {
    Project1,
    Project2,
    Project3,
    Project3ModuleA,
    Project4
  },
  setup () {
    const state = reactive({
      count: 0
    })
    const add = () => {
      state.count += 1
    }
    return {
      ...toRefs(state),
      add
    }
  }
})

</script>
