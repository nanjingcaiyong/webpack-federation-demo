module.exports = function (api, options = {}) {
  // if (api) {
  //   api.cache.never();
  // }
  api.cache(true);
  let presets = [
    '@babel/preset-typescript',
    "@babel/preset-react"
  ]
  let plugins = [
    [
      '@vue/babel-plugin-jsx',
      {
        enableObjectSlots: options.enableObjectSlots,
      },
    ],
    '@babel/plugin-transform-typescript' // 不加的话, .vue中使用<script lang=ts></script> 报错
  ]

  if (process.env.NODE_ENV === 'production') {

    presets.push([
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage',
        'corejs': 3
      }
    ])
  }

  return {
    presets,
    plugins
  };
}
