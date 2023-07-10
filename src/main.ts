import { createApp } from 'vue'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import registerStore from './stores'

createApp(App).use(registerStore).use(router).mount('#app')
