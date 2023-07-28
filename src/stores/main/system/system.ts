import { defineStore } from 'pinia'

import { deletePageData, editPageData, getPageListData, newPageData } from '@/service/main/system'

import type { ISystemState } from './type'
import type { IQueryInfo, pageName } from '@/service/main/type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageList: [],
    // 初始化pagin
    paginConfig: {
      size: 10,
      offset: 1,
      paginaCount: 0
    }
  }),
  actions: {
    // 页面的网络请求
    async getPageListDataAction(pageName: keyof pageName, queryInfo: IQueryInfo = {}) {
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.paginConfig.paginaCount = totalCount
    },
    async deletePageDataAction(pageName: keyof pageName, id: number) {
      const res = await deletePageData(pageName, id)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: keyof pageName, pageData: any) {
      const res = await newPageData(pageName, pageData)
      console.log(pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: keyof pageName, id: number, pageData: any) {
      const res = await editPageData(pageName, id, pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
