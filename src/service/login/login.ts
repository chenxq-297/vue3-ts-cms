import cmsRequst, { type IdataType } from '../index'

import type { IAccount } from '@/views/login/types/LoginAccountType'
import type { IAccountResult, IRoleMenus, IUserById } from './types'

export function accountLoginRequest(account: IAccount) {
  return cmsRequst.post<IdataType<IAccountResult>>({
    url: '/login',
    data: account
  })
}

// 查询用户角色(角色id)
export function getUserByIdRequset(id: number) {
  return cmsRequst.get<IdataType<IUserById>>({
    url: '/users/' + id
  })
}

// 查询解决菜单树
export function getRoleMenusRequset(id: number) {
  return cmsRequst.get<IdataType<IRoleMenus[]>>({
    url: `/role/${id}/menu`
  })
}
