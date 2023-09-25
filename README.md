## 微前端

## webpack5 联邦模块

## 项目配置

### ModuleFederationPlugin 介绍

模块联邦本身是一个Webpack 插件 ModuleFederationPlugin，插件有几个重要参数：

- `name`: 必须全局唯一，作为输出的模块名
- `filename`: 指定提供给其他服务加载的文件名
- `remotes`: 可以将其他项目的 `name` 映射到当前项目中，远程其他共享模块的加载地址
- `exposes`: 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用
- `shared`: 需要与宿主项目共享的依赖包。如果指定依赖包，那么宿主项目和寄生项目生产环境加载同一个资源

### 创建项目





### 寄生的子项目
```ts
// webpack.config.ts
export default {
  // ...
  plugins: [
    // ...
    new webpack.container.ModuleFederationPlugin({
      name: 'remote_one', // 暴露出去模块名
      filename: 'remoteEntry.js', // 暴露出去的文件名
      exposes: {          // 左边是相对路径和组件名字（其他库使用时候），右边是该组件在本库内的路径
        './AppContainer': './src/project1.vue'
      },
      shared: {           // 和宿主程序共用的dependency
        vue: {
          eager: true,    // 允许 Webpack 直接包含共享包，而不是通过异步请求获取库。当 eager 设置为 时true，所有共享模块将与暴露的模块一起编译。
          singleton: true //  在共享范围内只允许共享模块的单一版本。这意味着在任何情况下，页面上只会加载一个版本的包。如果一个范围已经有一个 @angular/core 的版本，并且导入的模块使用了不同版本的@angular/core，Webpack 将忽略新版本并使用范围中已经存在的版本。
        }
      }
    })
  ]
}
```

### 宿主项目

```ts
// webpack.config.ts
export default {
  // ...
  plugins: [
    // ...
    new webpack.container.ModuleFederationPlugin({
      name: 'base',
      remotes: {
        // [寄生模块的name]: [寄生模块的name]@[服务地址]/[寄生模块的name].js
        remote_one: 'remote_one@http://192.168.69.31:8081/remoteEntry.js'
      }
    })
  ]
}
```

```vue
<template>
  <Project1></Project1>
</template>
<script>
import { defineAsyncComponent } from 'vue'
const Project1 = defineAsyncComponent(() =>import('remote_one/AppContainer'))

export default {
  components: {
    Project1
  }
}

</script>
```

### 



## 注意点
- 联邦模块导出的vue文件名不能相同（例如各项目之间导出的project1.vue、project2.vue、project3.vue）
