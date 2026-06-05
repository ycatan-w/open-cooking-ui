import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import {
  PlaygroundThemeView,
  PlaygroundPage1View,
  PlaygroundPage2View,
  PlaygroundPage3View,
} from '@/components/playgrounds'
import CookContent from '@/CookContent.vue'
import ExploreContent from '@/ExploreContent.vue'
import LoadingView from '@/components/LoadingView.vue'
import { useOpenCookingManager } from '@/composables/useOpenCookingManager'
import ReadRecipeView from '@/components/ReadRecipeView.vue'

const { manager } = useOpenCookingManager()

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: AppLayout,
      beforeEnter() {
        manager.init()
      },
      children: [
        {
          path: '',
          redirect: '/loading',
        },

        {
          path: 'loading',
          component: LoadingView,
          beforeEnter: () => {
            if (manager.loadedSpecIsValid()) {
              return '/view'
            }
          },
        },

        {
          path: 'view',
          component: ReadRecipeView,
          beforeEnter: () => {
            if (!manager.loadedSpecIsValid()) {
              return '/loading'
            }
          },
        },
        {
          path: 'focus',
          component: CookContent,
          beforeEnter: () => {
            if (!manager.loadedSpecIsValid()) {
              return '/loading'
            }
          },
        },

        {
          path: 'explore',
          component: ExploreContent,
          beforeEnter: () => {
            if (!manager.loadedSpecIsValid()) {
              return '/loading'
            }
          },
        },
      ],
    },
    {
      path: '/playground',
      children: [
        { path: '', component: PlaygroundThemeView },
        {
          path: 'page-1',
          component: PlaygroundPage1View,
        },
        {
          path: 'page-2',
          component: PlaygroundPage2View,
        },
        {
          path: 'page-3',
          component: PlaygroundPage3View,
        },
      ],
    },
  ],
})
