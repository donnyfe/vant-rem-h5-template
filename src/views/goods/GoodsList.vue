<script
  setup
  lang="ts"
>
import { ref, reactive, toRefs } from 'vue'
import InfiniteList from 'vue3-infinite-list'

// 搜索相关
const searchState = () => {
  const state = reactive({
    value: '', // 搜索input框的值
    isSearch: true, // 是否显示历史搜索
    goodsList: [], // 根据搜索关键字返回的商品数据
    titleText: '搜索',
    scrollTop: 0, // 获取滚动高度
  })
  return toRefs(state)
}
const { value, isSearch, goodsList, titleText, scrollTop } = searchState()

const active = ref(0) // tab切换默认值

// 生成更丰富的测试数据
const generateTestData = () => {
  const data = []
  for (let i = 0; i < 10000; i++) {
    data.push({
      id: i + 1,
      title: `商品${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      desc: `这是商品${i + 1}的描述信息`,
      sales: Math.floor(Math.random() * 1000),
      image: 'https://img.yzcdn.cn/vant/cat.jpeg'
    })
  }
  return data
}

const testData = ref(generateTestData())

// 获取每个列表项的高度
const getItemSize = () => {
  return 150 // 根据实际的商品卡片高度设置
}

// 获取搜索成功的数据
const getSearchResult = params => {
  console.log(params, 'params')
  // 接口
}

// 点击搜索的回调
const handleSearch = e => {
  getSearchResult(e)
  console.log(e, 'eeeeeehandleSearch')
}

// 切换tab分类标签的回调
const handleTab = e => {
  // getSearchResult({keywords:value.value,searchValue: e.name})
  // console.log(e,'etabs');
  switch (e.name) {
    case 0:
      testData.value = testData.value
      console.log(testData.value, '000000000')
      break
    case 1:
      testData.value = testData.value
      console.log(testData.value, '111111111')
      break
    case 2:
      testData.value = testData.value.sort((a, b) => a.price - b.price)
      console.log(testData.value, '222222222')
      break
    case 3:
      testData.value = testData.value.sort((a, b) => b.price - a.price)
      console.log(testData.value, '33333333333')
      break
    default:
      break
  }
}
</script>

<template>
<div class="search d-flex flex-column justify-content-start">
  <!-- 头部搜索 -->
  <van-sticky>
    <LayoutHeader
      title="搜索"
      leftIcon="arrow-left"
      leftText=""
    />
    <form action="javascript:return true">
      <van-search
        ref="search"
        v-model="value"
        placeholder="请输入搜索文字"
        shape="round"
        show-action
        :autofocus="false"
        @focus="isSearch = true"
        @click="isSearch = true"
        @search="handleSearch(value)"
      >
        <template #action>
          <div
            class="search_Btn"
            @click="handleSearch(value)"
          >
            搜索
          </div>
        </template>
      </van-search>
    </form>
    <van-tabs
      v-model:active="active"
      @click-tab="handleTab"
    >
      <van-tab title="综合"></van-tab>
      <van-tab title="销量"></van-tab>
      <van-tab title="价格升序"></van-tab>
      <van-tab title="价格降序"></van-tab>
    </van-tabs>
  </van-sticky>
  <!-- 商品列表展示 -->
  <div class="card_Box mrn">
    <InfiniteList
      :data="testData"
      :width="'100%'"
      :height="600"
      :itemSize="getItemSize"
      :overscanCount="5"
      v-slot="{ item }"
    >
      <div class="list_content d-flex justify-content-between align-items-center">
        <div class="left">
          <van-image
            radius="14"
            width="130"
            height="120"
            fit="cover"
            :src="item.image"
          >
            <template #loading>
              <van-loading
                tv-slot="{ item }"
                :itemSize="getItemSize"
              />
            </template>
            <template #error>
              <van-image></van-image>
            </template>
          </van-image>
        </div>
        <div class="right d-flex flex-column justify-content-around w-100 h-100 ps-4 fs-4">
          <div>{{ item.title }}</div>
          <div>{{ item.desc }}</div>
          <div class="price">价格：￥{{ item.price }}</div>
          <div>销量：{{ item.sales }}</div>
        </div>
      </div>
    </InfiniteList>
  </div>
</div>
</template>

<style
  lang="scss"
  scoped
>
  .search {
    overflow: hidden;

    .search_Box {
      padding: 4px 10px;
      position: relative;
      display: flex;
      background-color: white;

      >div:nth-child(1) {
        width: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #5f656b;
        font-size: 20px;
      }

      >div:nth-child(2) {
        width: calc(100% - 8vw);

        .search_Btn {
          color: #b91c3b;
        }
      }
    }

    .mrn {
      width: 100vw;
      height: 100vh;

      >div:nth-child(1) {
        margin-top: 10px;
      }

      .list_content {
        height: 32vw;
        /* background-color: #f5f5f5; */
        border-radius: 10px;
        margin: 5px;
        padding: 0 10px;

        .left {}

        .right {
          overflow: hidden;

          >div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .price {
            color: red;
          }
        }
      }
    }
  }
</style>
