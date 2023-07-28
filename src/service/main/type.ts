export interface IdataType<T = any> {
  code: number
  data: T
}

export interface IList<T = any> {
  list: T
  totalCount: number
}

// export type pageName = 'department' | 'role' | 'menu' | 'goods' | 'category'

export type pageName = {
  users: IList<IUserList[]>
  department: IList<IDepartmentList[]>
  role: IList<IRoleList[]>
}

export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface IQueryInfo {
  offset?: number
  size?: number
  name?: string
  cellphone?: number
  realname?: string
  enable?: boolean
  createAt?: any
}

export interface IDepartmentList {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
}

export interface IRoleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: MenuList[]
}

export interface MenuList {
  id: number
  name: string
  type: number
  url: string
  sort: number
  icon?: string
  parentId?: number
  permission?: string
  children?: MenuList[]
}
