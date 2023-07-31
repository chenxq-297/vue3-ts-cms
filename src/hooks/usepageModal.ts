import { ref } from 'vue'

import useSystemStore from '@/stores/main/system/system'

import type { pageName } from '@/service/main/type'

export default function usePageModal(pagename: keyof pageName) {
  // 组件ref
  const modalRef = ref()
  // 回显数据
  const formDataEcho = ref(null)
  // hooks中判断为编辑还是删除
  let condition = true
  let resultId = 0

  const handleAdd = () => {
    formDataEcho.value = null
    modalRef.value.resetModelConfig()
    modalRef.value.dialogVisible = true
    // add && add()
  }

  const handlEdit = (item: any) => {
    formDataEcho.value = item
    resultId = item.id
    modalRef.value.dialogVisible = true
    // 判断为false
    condition = false
  }

  const handleDelect = (item: any) => {
    useSystemStore().deletePageDataAction(pagename, item.id)
  }

  const handleConfirm = (resultParma: any) => {
    if (condition) {
      useSystemStore().newPageDataAction(pagename, resultParma)
    } else {
      useSystemStore().editPageDataAction(pagename, resultId, resultParma)
    }
    modalRef.value.dialogVisible = false
  }

  return { modalRef, formDataEcho, handleAdd, handlEdit, handleDelect, handleConfirm }
}
