<script setup lang="ts">
import PageForm from '@/components/pageForm/index.vue'

import searchConfig from './config/search.config'

const queryBtnClick = (form) => {
  // 查询网络请求
  console.log(form)
}
const resetBtnClick = () => {
  // 重置网络请求
}
</script>

<template>
  <PageForm :searchConfig="searchConfig" @queryClick="(form) => queryBtnClick(form)" @resetClick="resetBtnClick" />
</template>
