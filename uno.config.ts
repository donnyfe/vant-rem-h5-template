import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  // 预设
  presets: [presetUno(), presetAttributify(), presetIcons()],

  // 快捷方式
  shortcuts: {
    // 常用flex布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    // 常用按钮样式
    btn: 'px-4 py-1 rounded inline-block bg-primary text-white cursor-pointer hover:bg-primary-dark',
    'btn-outline':
      'px-4 py-1 rounded inline-block border border-primary text-primary hover:bg-primary hover:text-white',
  },

  // 主题配置
  theme: {
    colors: {
      primary: {
        DEFAULT: '#3b82f6',
        dark: '#2563eb',
      },
    },
  },

  // 自定义规则
  rules: [['custom-rule', { color: '#3b82f6' }]],
})
