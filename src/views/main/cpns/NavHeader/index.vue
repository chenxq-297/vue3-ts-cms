<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import { mapPathToBreadcrumbs } from '@/utils/map-menu'
import LocalCache from '@/utils/cache'

import useLoginStore from '@/stores/login/login'

const route = useRoute()
const loginStore = useLoginStore()

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['collapseControl'])
const collapseIconClk = () => {
  const flag = !props.collapse
  console.log(flag)

  emits('collapseControl', flag)
}

const editLogin = () => {
  LocalCache.delecteCache('RB-cms-Token')
  router.push('/login')
}

// breadcrumbs 数据整合

const breadcrumbs = computed(() => {
  // console.log(loginStore.userMenus, route.path)

  // console.log(mapPathToBreadcrumbs(loginStore.userMenus, route.path))

  return mapPathToBreadcrumbs(loginStore.userMenus, route.path)
})
</script>

<template>
  <div class="nav-header">
    <div class="left">
      <el-icon @click="collapseIconClk">
        <ep-Expand v-if="collapse" />
        <ep-Fold v-else />
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <el-breadcrumb-item :to="item.path">{{
            item.name
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar class="right-img" size="small"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          297
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-item divided>
            <ep-InfoFilled />
            个人信息
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    margin-right: 9px;
  }

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .right-img {
    vertical-align: middle;
  }
}
</style>
