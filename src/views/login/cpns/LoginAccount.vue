<script setup lang="ts">
import { reactive, ref } from 'vue'
import { rules } from '../config/account-config'

import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import LocalCache from '@/utils/cache'
import useLoginStore from '@/stores/login/login'

import type { FormInstance } from 'element-plus'
import type { IAccount } from '@/views/login/types/LoginAccountType'
import { useRouter } from 'vue-router'
const route = useRouter()

const LoginStore = useLoginStore()

const formRef = ref<FormInstance>()
const account = reactive<IAccount>({
  name: LocalCache.getCache('RB-cms-name') ?? '',
  password: LocalCache.getCache('RB-cms-password') ?? ''
})

const loginAction = (isSaveLocal: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 未保存密码登录 取消本地缓存
      LocalCache.setCache('RB-cms-name', account.name)
      LocalCache.setCache('RB-cms-password', account.password)
      LocalCache.setCache('RB-cms-remember', 1)
      if (isSaveLocal === false) {
        LocalCache.delecteCache('RB-cms-name')
        LocalCache.delecteCache('RB-cms-password')
        LocalCache.delecteCache('RB-cms-remember')
      }
      LoginStore.accountLoginAction(account)
      console.log(route.options, 'route')
    } else {
      ElMessage('账号或密码有误')
    }
  })
}
defineExpose({ loginAction })
</script>

<template>
  <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped></style>
