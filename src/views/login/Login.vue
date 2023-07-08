<script setup lang="ts">
import { ref } from 'vue'
import LocalCache from '@/utils/cache'

import LoginAccount from './cpns/LoginAccount.vue'

const currentTab = ref('login')
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const registerRef = ref()
const isSaveLocal = ref<boolean>(LocalCache.getCache('RB-cms-remember') ? true : false)

const handLoginclick = () => {
  if (currentTab.value === 'login') {
    accountRef.value?.loginAction(isSaveLocal.value)
  }
}
</script>

<template>
  <div class="login">
    <div class="login-panel">
      <h1 class="title">后台管理系统</h1>
      <!-- 登录 -->
      <el-tabs type="border-card" class="demo-tabs" stretch :model-value="currentTab">
        <el-tab-pane name="login">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><ep-calendar /></el-icon>
              <span>登录</span>
            </span>
          </template>
          <LoginAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 注册 -->
        <el-tab-pane name="register">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><ep-calendar /></el-icon>
              <span>注册</span>
            </span>
          </template>
          <loginRegister ref="registerRef" />
        </el-tab-pane>
      </el-tabs>
      <!-- 按钮组 -->
      <div class="account-control" v-show="currentTab === 'login'">
        <el-checkbox v-model="isSaveLocal" label="Option">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button class="login-count" type="primary" @click="handLoginclick">登录</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');

  .login-panel {
    margin-bottom: 150px;
    width: 320px;

    .title {
      text-align: center;
    }

    .account-control {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }

    .login-count {
      width: 320px;
      margin-top: 10px;
    }
  }
}
</style>
