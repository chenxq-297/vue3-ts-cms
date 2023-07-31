import { ref } from 'vue'
export default function usePageModal() {
  const modalRef = ref()
  const formDataEcho = ref(null)

  const handleAdd = () => {
    formDataEcho.value = null
    modalRef.value.resetModelConfig()
    modalRef.value.dialogVisible = true
    // add && add()
  }

  const handlEdit = (item: any) => {
    // 跳出dial
    // 回填
    formDataEcho.value = item
    modalRef.value.dialogVisible = true
    // edit && edit(item)
  }

  const handleDelect = (item: any) => {
    formDataEcho.value = item
    modalRef.value.dialogVisible = true
  }

  const handleConfirm = (resultParma: any) => {
    console.log(297, resultParma)
    modalRef.value.dialogVisible = false
  }

  return { modalRef, formDataEcho, handleAdd, handlEdit, handleDelect, handleConfirm }
}
