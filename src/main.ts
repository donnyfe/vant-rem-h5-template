import { createApp } from 'vue'
import App from './App.vue'
import router from './router/dynamicRouter'
import store from './store'

// 移动端适配
import 'lib-flexible/flexible.js'
import '@/styles/index.scss'
import components from './plugins/components.js'

const app = createApp(App)
app.use(store).use(router).use(components).mount('#app')
