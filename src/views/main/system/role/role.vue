<script setup lang="ts" name="department">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import PageForm from '@/components/pageForm/index.vue'
import PageTable from '@/components/pageTable/index.vue'
import PageModal from '@/components/pageModal/index.vue'

import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'

import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'

import usePageContent from '@/hooks/usePageContent'
import usePermission from '@/hooks/usePermission'
import usePageModal from '@/hooks/usepageModal'

import type { IQueryInfo } from '@/service/main/type'

const systemStore = useSystemStore()
const mainStore = useMainStore()

const { pageList, paginConfig } = storeToRefs(systemStore)
const { entireMenus } = storeToRefs(mainStore)

// 表单搜索、重置
const { handleQueryClick, handleResetClick } = usePageContent(searchConfig.pageName)

// 权限
const { isQuery, isCreate, isDelete, isUpdate } = usePermission(searchConfig.pageName)

//弹窗
const { modalRef, formDataEcho, handleAdd, handlEdit, handleDelect, handleConfirm } = usePageModal(searchConfig.pageName)

const getPageListData = async (query: IQueryInfo = {}) => {
  await systemStore.getPageListDataAction(searchConfig.pageName, query)
}
getPageListData()
const changePaginConfig = (item: any) => {
  item.current === 'page-size' ? (paginConfig.value.size = item.currentNum) : (paginConfig.value.offset = (item.currentNum - 1) * paginConfig.value.size)
  const condition = { ...paginConfig.value }
  const flag = Reflect.deleteProperty(condition, 'paginaCount')
  flag && getPageListData(condition)
}
// 额外的
const otherInfo = ref({})
function handleMenuCheckChange(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// modalConfig 的需要初始化的下拉框(网络请求后的数据)
// const resultModelConfig = computed(() => {
//   const department = modalConfig.formItems.find((item) => item.prop === 'parentId')
//   if (department) department.options = departmentOptions.value as any
//   return modalConfig
// })
</script>

<template>
  <PageForm v-if="isQuery" :searchConfig="searchConfig" @queryClick="handleQueryClick" @resetClick="handleResetClick" />
  <PageTable headerName="角色管理" :table-config="tableConfig" :tableDatas="pageList" :paginOpen="true" :pagin-config="paginConfig" @paginConfigFn="changePaginConfig">
    <template #headerControl>
      <el-button v-if="isCreate" type="primary" @click="handleAdd">Add</el-button>
    </template>
    <template #handler="{ row }">
      <div class="handle-btns">
        <el-button v-if="isUpdate" type="primary" link @click="handlEdit(row)">编辑</el-button>
        <el-button v-if="isDelete" type="primary" @click="handleDelect(row)" link>删除</el-button>
      </div>
    </template>
  </PageTable>
  <PageModal ref="modalRef" :modalConfig="modalConfig" :defaultFormItemsValue="formDataEcho" @confirm="handleConfirm">
    <template #menulist>
      <el-tree ref="treeRef" :data="entireMenus" show-checkbox node-key="id" highlight-current :props="{ label: 'name', children: 'children' }" @check="handleMenuCheckChange" />
    </template>
  </PageModal>
</template>
