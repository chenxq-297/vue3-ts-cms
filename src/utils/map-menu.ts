import type { IRoleMenus } from '@/service/login/types'
import type { RouteRecordRaw } from 'vue-router'

interface IBreadcrumbs {
  name: string
  path: string
}

export let firstRoute: RouteRecordRaw | undefined = undefined
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
        // 添加匹配到的路由
        if (route) findRoutes.push(route)
        // 第一次登录
        if (route && !firstRoute) firstRoute = route
      } else {
        // 重定向路由（面包屑）
        if (menu.type === 1 && menu.children?.length) {
          findRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        }
        _recurserGetRoute(menu.children ?? [])
      }
    }
  }
  _recurserGetRoute(menus)

  return findRoutes
}

// 当前路由映射到面包屑
export function mapPathToBreadcrumbs(menus: IRoleMenus[], path: string) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of menus) {
    if (menu.children === undefined) return
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

// 根据当前路由匹配菜单
export function mapPathToMenu(menus: IRoleMenus[], path: string) {
  for (const menu of menus) {
    if (menu.children === undefined) return
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}
