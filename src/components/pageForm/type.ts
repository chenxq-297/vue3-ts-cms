import type { pageName } from '@/service/main/type'
import type { FormInstance } from 'element-plus'

export type searchConfig = {
  searchConfig: IFormProps
}

export type emitConfig = {
  (e: 'queryClick', v: searchFormType): searchFormType
  (e: 'resetClick'): void
}

export type searchFormType = Record<string, any>

export type formType = FormInstance

export interface IFormProps {
  pageName: keyof pageName
  formItems: IFormPropsItem[]
}

// initialValue 初始化值
export interface IFormPropsItem {
  label: string
  prop: string
  type: string
  options?: any[]
  placeholder?: string
  initialValue?: any
}
