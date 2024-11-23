import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

// 添加持久化存储插件
store.use(
  createPersistedState({
    // 默认所有 store 都会进行持久化
    // 可以通过在单个 store 中配置 persist 来覆盖这些选项
    storage: localStorage,
    key: prefix => `${prefix}`,
    // 自动将数据序列化/反序列化
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
)

// 添加错误处理插件
store.use(({ store }) => {
  store.$onAction(({ name, args, after, onError }) => {
    // action 执行前的钩子
    console.log(`Action ${name} was triggered with args:`, args)

    after(result => {
      // action 执行成功后的钩子
      console.log(`Action ${name} completed with result:`, result)
    })

    onError(error => {
      // action 执行失败时的钩子
      console.error(`Action ${name} failed with error:`, error)
    })
  })
})

export default store
