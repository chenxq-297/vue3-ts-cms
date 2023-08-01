import type { modalConfig1 } from '@/components/pageModal/type'

const modalConfig: modalConfig1 = {
  pageName: 'role',
  title: '新建角色',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      label: '权限介绍',
      prop: 'custom',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
