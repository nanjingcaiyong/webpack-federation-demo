# 微前端(MFE)演示项目


## 项目结构

```txt
├── package.json
├── packages
│   ├── app-base                                  基座项目
│   │   ├── ExternalTemplateRemotesPlugin.ts      webpack插件（使remotes可以动态配置链接，通过window动态设置域名和版本号）
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.html
│   │   │   ├── index.ts
│   │   │   ├── index.vue
│   │   │   └── main.ts
│   │   ├── tsconfig.json
│   │   ├── typings
│   │   │   ├── global.d.ts
│   │   │   └── module.d.ts
│   │   └── webpack.config.ts
│   ├── app1                                      子项目1（vue项目）
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.html
│   │   │   ├── index.ts
│   │   │   ├── main.ts
│   │   │   └── project1.vue
│   │   ├── tsconfig.json
│   │   ├── typings
│   │   │   └── global.d.ts
│   │   └── webpack.config.ts
│   ├── app2                                      子项目2（vue项目，使用基座项目导出的element-plus）
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.html
│   │   │   ├── index.ts
│   │   │   ├── main.ts
│   │   │   └── project2.vue
│   │   ├── tsconfig.json
│   │   ├── typings
│   │   │   └── global.d.ts
│   │   └── webpack.config.ts
│   ├── app4                                      子项目4（react项目）
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.html
│   │   │   ├── index.tsx
│   │   │   ├── main.tsx
│   │   │   └── project4.tsx
│   │   ├── tsconfig.json
│   │   └── webpack.config.ts
│   └── project3                                  子项目3（vue项目，导出多个组件）
│       ├── package.json
│       ├── src
│       │   ├── components
│       │   │   └── moduleA.vue
│       │   ├── index.html
│       │   ├── index.ts
│       │   ├── main.ts
│       │   └── project3.vue
│       ├── tsconfig.json
│       ├── typings
│       │   └── global.d.ts
│       └── webpack.config.ts
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## 项目配置

### ModuleFederationPlugin 介绍

模块联邦本身是一个Webpack 插件 ModuleFederationPlugin，插件有几个重要参数：

- `name`: 必须全局唯一，作为输出的模块名
- `filename（可选）`: 指定提供给其他服务加载的文件名（若未提供，默认为 `name` 设置值）
- `remotes（可选）`: 可以将其他项目的 `name` 映射到当前项目中，远程其他共享模块的加载地址
- `exposes（可选）`: 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用
- `library（可选）`: 定义了 remote 应用如何将输出内容暴露给 host 应用。配置项的值是一个对象，如 { type: 'xxx', name: 'xxx'}
- `shared（可选）`: 需要与宿主项目共享的依赖包。如果指定依赖包，那么宿主项目和寄生项目生产环境加载同一个资源
  + singleton: 默认值为false。是否开启单例模式，开启后 remote `应用组件` 和 `host应用` 共享的依赖只加载一次，而且是两者中版本比较高的。
  + requiredVersion: 指定共享依赖的版本，默认值为当前应用的依赖版本
  + eager: 共享依赖在打包过程中是否被分离为 async chunk。设置为 true， 共享依赖会打包到 main、remoteEntry，不会被分离，因此当设置为true时共享依赖是没有意义的

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



## 注意点
- 联邦模块导出的vue文件名不能相同（例如各项目之间导出的project1.vue、project2.vue、project3.vue）
