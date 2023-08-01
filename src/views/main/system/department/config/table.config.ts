import type { ITbaleProps } from '@/components/pageTable/type'

// 表格配置
const tableConfig: ITbaleProps = {
  tableConfig: {
    showSelectColumn: true,
    showIndexColumn: true,
    elTableConfig: null,
    tableItems: [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'leader', label: '领导人', minWidth: '100' },
      { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]
  },
  otherConfig: {}
}

export default tableConfig
