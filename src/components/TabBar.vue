<script lang="ts">
export default {
  name: 'TabBar',
}
</script>

<script
  setup
  lang="ts"
>
import { reactive, ref } from 'vue'

interface tabProps {
  data?: [
    {
      title: string
      to: string
      name: string
      icon: string
    },
  ]
}

const props = defineProps<tabProps>()

const emit = defineEmits(['chang'])

const active = ref('home')

const onChange = value => {
  // console.log(value,'value');

  emit('chang', value)
}
</script>

<template>
<div>
  <van-tabbar
    v-model="active"
    fixed
    route
    @change="onChange"
  >
    <van-tabbar-item
      v-for="(item, index) in props.data"
      :key="index"
      :to="item.to"
      :name="item.name"
      :icon="item.icon"
    >{{ item.title }}</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<style
  lang="scss"
  scoped
></style>
