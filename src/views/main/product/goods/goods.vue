<template>
  <PageTable headerName="商品列表" :table-config="tableConfig" :tableDatas="pageList" :paginOpen="true" :pagin-config="paginConfig" @paginConfigFn="changePaginConfig">
    <template #image="scope">
      <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]" fit="cover" />
    </template>
    <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
    <template #status="scope">
      <el-button plain :type="scope.row.status ? 'success' : 'danger'">
        {{ scope.row.status ? '上架' : '下架' }}
      </el-button>
    </template>
    <template #handler="{ row }">
      <div class="handle-btns">
        <el-button v-if="isUpdate" type="primary" link @click="handlEdit(row)">编辑</el-button>
        <el-button v-if="isDelete" type="primary" @click="handleDelect(row)" link>删除</el-button>
      </div>
    </template>
  </PageTable>
</template>

<script setup lang="ts" name="department">
import { storeToRefs } from 'pinia'
import PageTable from '@/components/pageTable/index.vue'
import useSystemStore from '@/stores/main/system/system'

import usePageContent from '@/hooks/usePageContent'
import usePermission from '@/hooks/usePermission'
import usePageModal from '@/hooks/usepageModal'

import type { IQueryInfo } from '@/service/main/type'

import tableConfig from './config/table.config'

// 表单搜索、重置
const { handleQueryClick, handleResetClick } = usePageContent('goods')

// 权限
const { isQuery, isCreate, isDelete, isUpdate } = usePermission('goods')

//弹窗
const { modalRef, formDataEcho, handleAdd, handlEdit, handleDelect, handleConfirm } = usePageModal('goods')

const systemStore = useSystemStore()

const { pageList, paginConfig } = storeToRefs(systemStore)

const getPageListData = async (query: IQueryInfo = {}) => {
  await systemStore.getPageListDataAction('goods', query)
}
getPageListData()
const changePaginConfig = (item: any) => {
  item.current === 'page-size' ? (paginConfig.value.size = item.currentNum) : (paginConfig.value.offset = (item.currentNum - 1) * paginConfig.value.size)
  const condition = { ...paginConfig.value }
  const flag = Reflect.deleteProperty(condition, 'paginaCount')
  flag && getPageListData(condition)
}
</script>

<style scoped>
.department {
}
</style>
