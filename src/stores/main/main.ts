import { getDepartmentData, getMenuData, getRoleData } from '@/service/main/system'
import { defineStore } from 'pinia'

interface IMainState {
  departments: any[]
  roles: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    departments: [],
    roles: [],
    entireMenus: []
  }),
  getters: {
    departmentOptions: (state) => {
      return state.departments.map((item) => ({ title: item.name, value: item.id }))
    },
    rolesOptions: (state) => {
      return state.roles.map((item) => ({ title: item.name, value: item.id }))
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const departmentResult = await getDepartmentData({ offset: 0, size: 100 })
      const roleResult = await getRoleData({ offset: 0, size: 100 })
      const menuResult = await getMenuData()

      this.departments = departmentResult.data.list
      this.roles = roleResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
