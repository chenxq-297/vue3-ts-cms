import type { ITbaleProps } from '@/components/pageTable/type'

// 表格配置
const tableConfig: ITbaleProps = {
  tableConfig: {
    showSelectColumn: true,
    showIndexColumn: true,
    elTableConfig: null,
    tableItems: [
      { prop: 'name', label: '菜单名称', width: '180px' },
      // { prop: 'intro', label: '级别', width: '180px' },
      { prop: 'url', label: '菜单url', width: '240px' },
      { prop: 'sort', label: '排序', width: '120px' },
      { prop: 'permission', label: '权限', width: '180px' },
      { prop: 'createAt', label: '创建时间' },
      { prop: 'updateAt', label: '更新时间' }
      // { slotName: 'handler', label: '操作', width: '180px' }
    ]
  },
  otherConfig: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}

export default tableConfig
