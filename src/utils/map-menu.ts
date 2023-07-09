import type { IRoleMenus } from '@/service/login/types'
import type { RouteRecordRaw } from 'vue-router'

// 所有路由表
export function loadAllRoutes() {
  const routes: RouteRecordRaw[] = []
  const modules: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  for (const key in modules) {
    const route = modules[key]
    routes.push(route.default)
  }
  return routes
}

// 动态添加路由(所有与单个对比)
export function mapMenuToRoutes(menus: IRoleMenus[]) {
  const allRoutes = loadAllRoutes()
  const findRoutes: RouteRecordRaw[] = []
  function _recurserGetRoute(menus: IRoleMenus[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => {
          return item.path === menu.url
        })

        if (route) findRoutes.push(route)
      } else {
        // if (menu.type === 1 && menu.children?.length) {
        //   findRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        // }
        _recurserGetRoute(menu.children ?? [])
      }
    }
  }
  _recurserGetRoute(menus)

  return findRoutes
}

// 当前路由映射到面包屑
export function mapPathToBreadcrumbs(menus: any, path: any) {
  const breadcrumbs = []
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
