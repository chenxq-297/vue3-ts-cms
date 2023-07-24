<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PageForm from '@/components/pageForm/index.vue'
import PageTable from '@/components/pageTable/index.vue'

import searchConfig from './config/search.config'
import { tableConfig, paginConfig } from './config/table.config'

import useSystemStore from '@/stores/main/system/system'
import type { IQueryInfo } from '@/service/main/type'

const systemStore = useSystemStore()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

const resetBtnClick = () => {
  // 重置网络请求
}
const aaaa = (val: any) => {
  val.current === 'page-size' ? (paginConfig.size = val.currentNum) : (paginConfig.offset = val.currentNum)
}

const getPageListData = (query: IQueryInfo) => {
  systemStore.getPageListDataAction(searchConfig.pageName, query)
  paginConfig.paginaCount = pageTotalCount.value
}
getPageListData({})

const handledit = (a) => {}
const handledelect = (a) => {}
</script>

<template>
  <PageForm :searchConfig="searchConfig" @queryClick="(form) => getPageListData(form)" @resetClick="resetBtnClick" />
  <PageTable :tableConfig="tableConfig" :tableDatas="pageList" :pagin-config="paginConfig" @paginConfigFn="aaaa">
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
