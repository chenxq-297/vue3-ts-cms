export interface IAccountResult {
  id: number
  name: string
  token: string
}

export interface IUserById {
  id: number
  name?: string
  realname?: string
  cellphone?: number
  enable?: number
  createAt?: string
  updateAt?: string
  role: {
    id: number
    name?: string
    intro?: string
    createAt?: string
    updateAt?: string
  }
  department: {
    id: number
    name?: string
    parentId?: null
    createAt?: string
    updateAt?: string
    leader?: string
  }
}

export interface IRoleMenus {
  id: number
  name: string
  type: number
  url: string
  icon?: string
  sort: number
  parentId?: number
  permission?: string
  children?: IRoleMenus[]
}
