<template>
  <h2>项目：Project1</h2>
  <p>count: {{ count }}</p>
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
import { defineComponent, watch, watchEffect, onMounted, ref, inject, reactive, toRefs, computed } from 'vue'
export default defineComponent({
  name: 'project1_module',
  props: {
    count: Number
  },
  setup (props) {
    watchEffect(() => {
      console.log('监听Base的count：', props.count)
    })
  }
})
</script>