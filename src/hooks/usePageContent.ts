import useSystemStore from '@/stores/main/system/system'

import type { IQueryInfo, pageName } from '@/service/main/type'

const systemStore = useSystemStore()
function usePageContent(pagename: keyof pageName) {
  function handleQueryClick(searchInfo: IQueryInfo) {
    // const condition = { ...searchInfo, ...systemStore.$state.paginConfig }
    // Reflect.deleteProperty(condition, 'paginaCount')
    // systemStore.getPageListDataAction(pagename, condition)
    systemStore.getPageListDataAction(pagename, searchInfo)
  }
  function handleResetClick() {
    systemStore.$reset()
    // const condition = systemStore.$state.paginConfig
    // Reflect.deleteProperty(condition, 'paginaCount')
    systemStore.getPageListDataAction(pagename, {})
  }

  return {
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
