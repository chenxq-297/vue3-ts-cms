import { defineStore } from 'pinia'

import { accountLoginRequest, getRoleMenusRequset, getUserByIdRequset } from '@/service/login/login'
import { mapMenuToRoutes, firstRoute } from '@/utils/map-menu'
import LocalCache from '@/utils/cache'
import router from '@/router'

import type { IAccount } from '@/views/login/types/LoginAccountType'
import type { IRoleMenus, IUserById } from '@/service/login/types'

interface stateType {
  tokens: string
  userInfo: IUserById
  userMenus: IRoleMenus[]
}

const useLoginStore = defineStore('login', {
  state(): stateType {
    return {
      tokens: '',
      userInfo: {
        id: 0,
        role: {
          id: 0
        },
        department: {
          id: 0
        }
      },
      userMenus: []
    }
  },
  getters: {},
  actions: {
    // 登录
    async accountLoginAction(payload: IAccount) {
      const login = await accountLoginRequest(payload)
      const { id, token } = login.data
      this.tokens = token
      LocalCache.setCache('RB-cms-Token', this.tokens)

      // 用户信息
      const user = await getUserByIdRequset(id)
      this.userInfo = user.data
      LocalCache.setCache('RB-cms-userInfo', this.userInfo)

      // role的id获取菜单
      const menu = await getRoleMenusRequset(this.userInfo.role.id)
      this.userMenus = menu.data
      LocalCache.setCache('RB-cms-userMenus', this.userMenus)

      // 动态添加路由
      const routes = mapMenuToRoutes(this.userMenus)
      for (const route of routes) {
        router.addRoute('main', route)
      }

      // 跳转第一条路由
      firstRoute ? router.push(firstRoute) : router.push('/main')
    },

    // 持久化
    loadLocalDataActions() {
      this.tokens = LocalCache.getCache('RB-cms-Token')
      this.userInfo = LocalCache.getCache('RB-cms-userInfo')
      this.userMenus = LocalCache.getCache('RB-cms-userMenus')

      const routes = mapMenuToRoutes(this.userMenus)
      for (const route of routes) {
        router.addRoute('main', route)
      }
    }
  }
})

export default useLoginStore
