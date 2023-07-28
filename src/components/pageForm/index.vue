<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { Refresh, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

import type { searchConfig, emitConfig, formType, searchFormType } from './type'

const props = defineProps<searchConfig>()
const emit = defineEmits<emitConfig>()
const formRef = ref<formType>()

// 初始化表单数据
const searchForm = reactive<searchFormType>(
  props.searchConfig.formItems.reduce((form: searchFormType, item) => {
    form[item.prop] = item['initialValue'] ?? ''
    return form
  }, {})
)

function handleResetClick() {
  formRef.value!.resetFields()
  // console.log(formRef.value)
  // console.log(searchForm)
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="pageForm">
    <!-- 表单输入 -->
    <el-form :model="searchForm" ref="formRef" label-width="auto" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-model="searchForm[item.prop]" style="width: '100%'">
                  <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.title" />
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker type="daterange" v-model="searchForm[item.prop]" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 搜索按钮  -->
    <div class="btns">
      <el-button size="large" :icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" :icon="Search" type="primary" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pageForm {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
  .el-select {
    width: 100% !important;
  }
}
.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
