<script
  setup
  lang="ts"
>
import { ref, reactive, toRefs } from 'vue'

//底部tab栏相关
const useTabBar = () => {
  const state = reactive({
    tabBar: [
      {
        title: '首页',
        icon: 'home-o',
        to: {
          name: 'home',
        },
      },
      {
        title: '我',
        icon: 'user-o',
        to: {
          name: 'about',
        },
      },
    ],
  })
  return toRefs(state)
}
const { tabBar } = useTabBar()

const handleChange = value => {
  // console.log('change tab: ', value);
}
</script>

<template>
<div class="app-container">
  <div class="layout-content">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
  <div class="layout-footer">
    <TabBar
      :data="tabBar"
      @chang="handleChange"
    ></TabBar>
  </div>
</div>
</template>

<style
  lang="scss"
  scoped
></style>
