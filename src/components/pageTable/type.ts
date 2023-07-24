// export type ITbaleProps = {
//   tableDatas: any[]
//   tableConfig: {
//     showSelectColumn: any[]
//     showIndexColumn: any
//     elTableConfig: any
//     tableItems: any[]
//   }
//   otherConfig: {}
//   paginConfig?: {
//     showfooter: boolean
//     paginations: Record<'offset' | 'size', number>
//     paginaCount: number
//   }
// }

export type tableConfig = {
  tableConfig: ITbaleProps
  paginConfig?: IPaginConfig
  tableDatas: any[]
}

export interface ITbaleProps {
  tableConfig: {
    showSelectColumn: boolean
    showIndexColumn: boolean
    elTableConfig: any
    tableItems: any[]
  }
  otherConfig: {}
}

export interface IPaginConfig {
  showfooter: boolean
  offset: number
  size: number
  // paginations: Record<'offset' | 'size', number>
  paginaCount: number
}

export type emitsTableConfig = {
  (e: 'paginConfigFn', v: { current: string; currentNum: number }): void
}
