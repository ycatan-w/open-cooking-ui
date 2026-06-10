import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes.ts'
import { registerGuards } from './guards.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

registerGuards(router)

export default router
