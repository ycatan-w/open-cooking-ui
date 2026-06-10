import type { RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PlaygroundLayout from '@/layouts/PlaygroundLayout.vue'

import ReadRecipeView from '@/components/ReadRecipeView.vue'
import CookingView from '@/components/CookingView.vue'
import ExploreView from '@/components/ExploreView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'recipes/:id',
        component: ReadRecipeView,
      },
      {
        path: 'recipes/:id/cook',
        component: CookingView,
      },
      {
        path: 'explore',
        component: ExploreView,
      },
    ],
  },
  {
    path: '/playground',
    component: PlaygroundLayout,
  },
]
