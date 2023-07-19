import type { ElForm } from 'element-plus'

export type searchConfig = {
  searchConfig: IFormProps
}

export type emitConfig = {
  (e: 'queryClick', v: searchFormType): searchFormType
  (e: 'resetClick'): void
}

export type searchFormType = Record<string, any>

export type formType = InstanceType<typeof ElForm>

export interface IFormProps {
  pageName: string
  formItems: IFormPropsItem[]
}

// initialValue 初始化值
export interface IFormPropsItem {
  label: string
  prop: string
  type: string
  options?: any
  placeholder?: string
  initialValue?: any
}
