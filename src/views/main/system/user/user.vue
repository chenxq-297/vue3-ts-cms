<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, watch } from 'vue'
import { storeToRefs } from 'pinia'
import PageForm from '@/components/pageForm/index.vue'
import PageTable from '@/components/pageTable/index.vue'

import usePageContent from '@/hooks/usePageContent'

import searchConfig from './config/search.config'
import { tableConfig } from './config/table.config'

import useSystemStore from '@/stores/main/system/system'
import type { IQueryInfo } from '@/service/main/type'

const systemStore = useSystemStore()

const { pageList, paginConfig } = storeToRefs(systemStore)

// 表单搜索、重置
const { handleQueryClick, handleResetClick } = usePageContent(searchConfig.pageName)

const getPageListData = async (query: IQueryInfo = {}) => {
  await systemStore.getPageListDataAction(searchConfig.pageName, query)
}
getPageListData()
onMounted(() => {
  // const condition = paginConfig.value
  // const flag = Reflect.deleteProperty(condition, 'paginaCount')
})

const aaaa = (val: any) => {
  val.current === 'page-size' ? (paginConfig.value.size = val.currentNum) : (paginConfig.value.offset = (val.currentNum - 1) * paginConfig.value.size)
  const condition = { ...paginConfig.value }
  const flag = Reflect.deleteProperty(condition, 'paginaCount')

  getPageListData(condition)
}

const handledit = (a: any) => {}
const handledelect = (a: any) => {}
</script>

<template>
  <PageForm :searchConfig="searchConfig" @queryClick="handleQueryClick" @resetClick="handleResetClick" />
  <PageTable headerName="用户数据" :tableConfig="tableConfig" :tableDatas="pageList" :paginOpen="true" :pagin-config="paginConfig" @paginConfigFn="aaaa">
    <template #headerControl>
      <el-button type="primary">Add</el-button>
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
        <el-button type="primary" link @click="handledit(row)">编辑</el-button>
        <el-button type="primary" @click="handledelect(row)" link>删除</el-button>
      </div>
    </template>
  </PageTable>
</template>
