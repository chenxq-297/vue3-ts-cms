import { defineStore } from 'pinia'
import LocalCache from '@/utils/cache'

import type { IAccount } from '@/views/login/types/LoginAccountType'
import { accountLoginRequest, getRoleMenusRequset, getUserByIdRequset } from '@/service/login/login'
import type { IRoleMenus, IUserById } from '@/service/login/types'
import router from '@/router'

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

      // main
      console.log(router.push('/main'))
    }
  }
})

export default useLoginStore
