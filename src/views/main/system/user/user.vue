<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import PageForm from '@/components/pageForm/index.vue'
import PageTable from '@/components/pageTable/index.vue'
import PageModal from '@/components/pageModal/index.vue'

import usePageContent from '@/hooks/usePageContent'
import usePermission from '@/hooks/usePermission'
import usePageModal from '@/hooks/usepageModal'

import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'

import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'

import type { IQueryInfo } from '@/service/main/type'

const systemStore = useSystemStore()
const mainStore = useMainStore()

const { pageList, paginConfig } = storeToRefs(systemStore)
const { departmentOptions, rolesOptions } = storeToRefs(mainStore)

// 表单搜索、重置
const { handleQueryClick, handleResetClick } = usePageContent(searchConfig.pageName)

// 权限
const { isQuery, isCreate, isDelete, isUpdate } = usePermission(searchConfig.pageName)

//弹窗
const { modalRef, formDataEcho, handleAdd, handlEdit, handleDelect, handleConfirm } = usePageModal(searchConfig.pageName)
// 可以再度优化 把值传入hooks 让它初始化完成 在组件那边就不需要回显操作

// modalConfig 的需要初始化的下拉框(网络请求后的数据)
const resultModelConfig = computed(() => {
  const department = modalConfig.formItems.find((item) => item.prop === 'departmentId')
  const roleItem = modalConfig.formItems.find((item) => item.prop === 'roleId')
  if (department && roleItem) {
    department.options = departmentOptions.value as any
    roleItem.options = rolesOptions.value as any
  }
  return modalConfig
})

// 页面数据
const getPageListData = async (query: IQueryInfo = {}) => {
  await systemStore.getPageListDataAction(searchConfig.pageName, query)
}
getPageListData()

// 页面发生修改(可封装)
const changePaginConfig = (item: any) => {
  item.current === 'page-size' ? (paginConfig.value.size = item.currentNum) : (paginConfig.value.offset = (item.currentNum - 1) * paginConfig.value.size)
  const condition = { ...paginConfig.value }
  const flag = Reflect.deleteProperty(condition, 'paginaCount')
  flag && getPageListData(condition)
}
</script>

<template>
  <PageForm v-if="isQuery" :searchConfig="searchConfig" @queryClick="handleQueryClick" @resetClick="handleResetClick" />
  <PageTable headerName="用户数据" :tableConfig="tableConfig" :tableDatas="pageList" :paginOpen="true" :pagin-config="paginConfig" @paginConfigFn="changePaginConfig">
    <template #headerControl>
      <el-button v-if="isCreate" type="primary" @click="handleAdd">Add</el-button>
    </template>
    <template #status="{ row }">
      <el-button plain :type="row.enable ? 'success' : 'danger'">
        {{ row.enable ? '启用' : '禁用' }}
      </el-button>
    </template>
    <template #createAt="{ row }">
      <strong>{{ row.createAt }}</strong>
    </template>
    <template #updateAt="{ row }">
      <strong>{{ row.updateAt }}</strong>
    </template>
    <template #handler="{ row }">
      <div class="handle-btns">
        <el-button v-if="isUpdate" type="primary" link @click="handlEdit(row)">编辑</el-button>
        <el-button v-if="isDelete" type="primary" @click="handleDelect(row)" link>删除</el-button>
      </div>
    </template>
  </PageTable>
  <PageModal ref="modalRef" :modalConfig="resultModelConfig" :defaultFormItemsValue="formDataEcho" @confirm="handleConfirm" />
</template>
