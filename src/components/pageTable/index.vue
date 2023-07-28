<script setup lang="ts">
import { ref, computed } from 'vue'

import type { tableConfig, emitsTableConfig } from './type'

const props = withDefaults(defineProps<tableConfig>(), {
  paginOpen: false
})
const emits = defineEmits<emitsTableConfig>()

// 拿到props的页码、监听、以及发生变化导出
const offset = ref(props.paginConfig?.offset || 10)
const size = ref(props.paginConfig?.size || 1)
const paginaCount = computed(() => props.paginConfig?.paginaCount)
// const  = ref(props.paginConfig?.paginaCount || 0)
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
  <header>
    <div class="title">{{ headerName }}</div>
    <div class="headerControl">
      <slot name="headerControl"></slot>
    </div>
  </header>
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
  <footer v-if="paginOpen">
    <slot name="footer">
      <el-pagination
        v-model:current-page="offset"
        v-model:page-size="size"
        @update:page-size="changePagina('page-size', $event)"
        @update:current-page="changePagina('current-page', $event)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginaCount"
      />
    </slot>
  </footer>
</template>

<style lang="less" scoped>
header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .headerControl {
    align-items: center;
  }
}
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
