<script setup lang="ts">
import { ref } from 'vue'

import NavHeader from './cpns/NavHeader/index.vue'

const collapse = ref<boolean>(false)
const collapseControl = (value: boolean) => {
  collapse.value = value
}
</script>

<template>
  <el-container class="main-content">
    <el-aside :width="collapse ? '60px' : '210px'">
      <!-- <NavMenu :collapse="Collapse" /> -->
    </el-aside>
    <el-container class="page">
      <el-header class="page-header">
        <NavHeader :collapse="collapse" @collapseControl="collapseControl" />
      </el-header>
      <el-main class="page-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.main-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .page-content {
    height: calc(100% - 48px);
    background-color: #fff;
    border-radius: 5px;
  }

  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-header {
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
