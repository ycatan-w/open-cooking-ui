import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { vClickOutside } from '@/directives/ClickOutsideDirective.ts'
import App from './App.vue'
// import router from './router.ts'
import router from '@/router'

const app = createApp(App)

app.use(router)
app.mount('#app')
app.directive('click-outside', vClickOutside)
