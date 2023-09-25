import { createApp } from 'vue'
import App from './project1.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'


createApp(App)
  .use(ElementPlus)
  .mount('#app')