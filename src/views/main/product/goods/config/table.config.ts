import type { ITbaleProps } from '@/components/pageTable/type'

// 表格配置
const tableConfig: ITbaleProps = {
  tableConfig: {
    showSelectColumn: true,
    showIndexColumn: true,
    elTableConfig: null,
    tableItems: [
      { prop: 'name', label: '商品名称', minWidth: '80' },
      { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
      { prop: 'newPrice', label: '现价格', minWidth: '80' },
      { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
      { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
      // { label: '操作', minWidth: '120', slotName: 'handler' }
    ]
  },
  otherConfig: {}
}

export default tableConfig
