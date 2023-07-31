import type { IFormPropsItem } from '../pageForm/type'

export interface IProps {
  modalConfig: {
    pageName: string
    title: string
    formItems: IFormPropsItem[]
  }
  defaultFormItemsValue: any
  otherInfo?: any
}
