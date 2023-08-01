import type { ITbaleProps } from '@/components/pageTable/type'

// 表格配置
const tableConfig: ITbaleProps = {
  tableConfig: {
    showSelectColumn: true,
    showIndexColumn: true,
    elTableConfig: null,
    tableItems: [
      { prop: 'name', label: '角色名称', width: '180px' },
      { prop: 'intro', label: '角色权限', width: '180px' },
      { prop: 'createAt', label: '创建时间' },
      { prop: 'updateAt', label: '更新时间' },
      { slotName: 'handler', label: '操作', width: '180px' }
    ]
  },
  otherConfig: {}
}

export default tableConfig
