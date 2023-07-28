import useSystemStore from '@/stores/main/system/system'

import type { IQueryInfo, pageName } from '@/service/main/type'

const systemStore = useSystemStore()
function usePageContent(pagename: keyof pageName) {
  function handleQueryClick(searchInfo: IQueryInfo) {
    systemStore.getPageListDataAction(pagename, searchInfo)
  }
  function handleResetClick() {
    systemStore.$reset()
    systemStore.getPageListDataAction(pagename)
  }

  return {
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
