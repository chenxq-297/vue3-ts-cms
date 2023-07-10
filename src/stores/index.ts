import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App) {
  app.use(pinia)

  // 初始化
  const loginStore = useLoginStore()
  loginStore.loadLocalDataActions()
}

export default registerStore
