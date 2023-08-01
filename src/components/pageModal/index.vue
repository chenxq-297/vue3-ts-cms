<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import type { IProps } from '@/components/pageModal/type'
import type { searchFormType } from '@/components/pageForm/type'
const props = defineProps<IProps>()
defineEmits(['confirm'])

const dialogVisible = ref(false)

// 初始化表单数据
const searchForm = reactive<searchFormType>(
  props.modalConfig.formItems.reduce((form: any, item) => {
    form[item.prop] = item['initialValue'] ?? ''
    return form
  }, {})
)

// 清空
function resetModelConfig() {
  for (const item of props.modalConfig.formItems) {
    searchForm[`${item.prop}`] = ''
  }
}

// 回显
watch(
  () => props.defaultFormItemsValue,
  (newVal) => {
    if (newVal === null) return
    for (const item of props.modalConfig.formItems) {
      searchForm[`${item.prop}`] = newVal[`${item.prop}`] ?? ''
    }
  }
)

defineExpose({ dialogVisible, resetModelConfig })
</script>

<template>
  <el-dialog v-model="dialogVisible" title="新建" width="30%" center destroy-on-close>
    <!-- 与pagefrom代码重复 可进行第三层封装 -->
    <el-form :model="searchForm" label-width="80px" size="large" style="padding: ' 10px 30px'">
      <template v-for="item in modalConfig.formItems" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-if="item.type === 'password'">
            <el-input show-password v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-if="item.type === 'select'">
            <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder" style="width: 100%">
              <template v-for="value in item.options" :key="value.value">
                <el-option :value="value.value" :label="value.title" />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'date-picker'">
            <el-date-picker type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" v-model="searchForm[item.prop]" />
          </template>
          <template v-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="$emit('confirm', searchForm)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
