<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// import useSystemStore from '@/stores/main/system/system.ts'
// import usePermission from '@/hooks/usePermission.ts'

interface IProps {
  tableConfig: {
    propsList: any[]
    childrenProps?: any
  }
  otherConfig: {
    header?: {
      title: string
      btnTitle?: string
    }
    pageName: string
    showfooter: boolean
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newDataClick', 'editDataClick'])
</script>

<template>
  <div v-if="otherConfig.header" class="header">
    <h3 class="title">{{ otherConfig.header.title }}</h3>
    <!-- <el-button v-if="isCreate" type="primary" @click="handleNewData">
        {{ contentConfig.header?.btnTitle }}
      </el-button> -->
  </div>
  <div class="table">
    <el-table :data="pageList" :border="true" style="width: 100%" v-bind="contentConfig.childrenProps">
      <template v-for="item in contentConfig.propsList" :key="item.prop">
        <template v-if="item.type === 'time'">
          <el-table-column align="center" :prop="item.prop" :label="item.label">
            <template #default="scope">
              {{ utcFormat(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'handler'">
          <el-table-column align="center" :label="item.label" :width="item.width">
            <template #default="scope">
              <el-button v-if="isUpdate" type="primary" size="small" icon="EditPen" link @click="handleEditClick(scope.row)"> 编辑 </el-button>
              <el-button v-if="isDelete" type="danger" size="small" icon="Delete" link @click="handleDeleteClick(scope.row.id)"> 删除 </el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'custom'">
          <el-table-column align="center" :label="item.label" :width="item.width">
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column align="center" v-bind="item" />
        </template>
      </template>
    </el-table>
  </div>
  <footer v-if="contentConfig.showfooter">
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="pageTotalCount" @current-change="handleCurrentChange" />
  </footer>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
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
