import { createApp } from 'vue'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './stores'

createApp(App).use(router).use(pinia).mount('#app')
