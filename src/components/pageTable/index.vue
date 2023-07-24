<script setup lang="ts">
import { ref } from 'vue'

import type { tableConfig, emitsTableConfig } from './type'

const props = withDefaults(defineProps<tableConfig>(), {})
const emits = defineEmits<emitsTableConfig>()

// 拿到props的页码、监听、以及发生变化导出
const offset = ref(props.paginConfig?.offset || 1)
const size = ref(props.paginConfig?.size || 1)

// watch([offset, size], () => {
//   const paginConfig = {
//     size: size.value,
//     offset: offset.value
//   }
//   emits('@update:paginConfig', { ...props?.paginConfig, ...paginConfig })
//   // console.log(123123123123123)
//   // console.log(props)
// })

const changePagina = (current: string, currentNum: number) => {
  // 赋值本组件
  current === 'page-size' ? (size.value = currentNum) : (offset.value = currentNum)
  // 发射父组件
  emits('paginConfigFn', { current, currentNum })
}
</script>

<template>
  <el-table :data="tableDatas" border style="width: 100%" @selectionChange="(selection: any) => $emit('selectionChange', selection)" v-bind="tableConfig.tableConfig.elTableConfig">
    <el-table-column v-if="tableConfig.tableConfig.showSelectColumn" type="selection" align="center" width="60px"></el-table-column>
    <el-table-column v-if="tableConfig.tableConfig.showIndexColumn" type="index" label="序号" align="center" width="80px"></el-table-column>
    <template v-for="item in tableConfig.tableConfig.tableItems" :key="item.prop">
      <el-table-column v-bind="item" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <slot :name="item.slotName" :row="row">
            {{ row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <footer v-if="paginConfig?.showfooter">
    <slot name="footer">
      <el-pagination
        :current-page="offset"
        :page-size="size"
        @update:page-size="changePagina('page-size', $event)"
        @update:current-page="changePagina('current-page', $event)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginConfig.paginaCount"
      />
    </slot>
  </footer>
</template>

<style lang="less" scoped>
.table {
  :deep(.el-table__cell) {
    padding: 14px 0;
  }
}

footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
