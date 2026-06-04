import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vClickOutside } from './directives/ClickOutsideDirective.vue'

const app = createApp(App)

app.use(router)
app.directive('click-outside', vClickOutside)

app.mount('#app')
