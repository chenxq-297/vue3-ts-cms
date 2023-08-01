import type { IFormPropsItem } from '../pageForm/type'

export interface IProps {
  modalConfig: modalConfig1
  defaultFormItemsValue: any
  otherInfo?: any
}

export interface modalConfig1 {
  pageName: string
  title: string
  formItems: IFormPropsItem[]
}
