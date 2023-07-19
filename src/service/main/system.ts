import cmsRequst, { type IdataType } from '../index'

import type { IList, IUserList, pageName } from './type'

// 用户管理 ： 用户列表
export function getUserListData(queryInfo: any) {
  return cmsRequst.post<IdataType<IList<IUserList[]>>>({
    url: '/users/list',
    data: queryInfo
  })
}

export function newUserData(userInfo: any) {
  return cmsRequst.post<IdataType<string>>({
    url: '/users',
    data: userInfo
  })
}

export function deleteUserData(id: number) {
  return cmsRequst.delete<IdataType<string>>({
    url: '/users/' + id
  })
}

export function editUserData(id: number, userInfo: any) {
  return cmsRequst.patch<IdataType<string>>({
    url: '/users/' + id,
    data: userInfo
  })
}

// 获取数据 不同路径请求
export function getPageListData<T extends keyof pageName>(pageName: T, queryInfo: any) {
  return cmsRequst.post<IdataType<pageName[T]>>({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageData<T extends keyof pageName>(pageName: T, id: number) {
  return cmsRequst.delete<IdataType<string>>({
    url: `/${pageName}/${id}`
  })
}

export function newPageData<T extends keyof pageName>(pageName: T, dataInfo: any) {
  return cmsRequst.post<IdataType<string>>({
    url: `/${pageName}`,
    data: dataInfo
  })
}

export function editPageData<T extends keyof pageName>(pageName: T, id: number, dataInfo: any) {
  return cmsRequst.patch<IdataType<string>>({
    url: `/${pageName}/${id}`,
    data: dataInfo
  })
}

// /** 获取部门的信息 */
// export function getDepartmentData(queryInfo: any) {
//   return cmsRequst.post({
//     url: '/department/list',
//     data: queryInfo
//   })
// }

// /** 获取角色的信息 */
// export function getRoleData(queryInfo: any) {
//   return cmsRequst.post({
//     url: '/role/list',
//     data: queryInfo
//   })
// }

// /** 获取菜单的信息 */
// export function getMenuData() {
//   return cmsRequst.post({
//     url: '/menu/list'
//   })
// }
