import { createRouter, createWebHistory, useRouter } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import {
  PlaygroundThemeView,
  PlaygroundPage1View,
  PlaygroundPage2View,
  PlaygroundPage3View,
} from '@/components/playgrounds'
import ReadContent from '@/ReadContent.vue'
import CookContent from '@/CookContent.vue'
import ExploreContent from '@/ExploreContent.vue'
import { getOpenCookingManager } from '@/open-cooking-manager'
import LoadingView from '@/components/LoadingView.vue'

const manager = getOpenCookingManager()

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
            if (manager.hasLoadedSpec()) {
              return '/view'
            }
          },
        },

        {
          path: 'view',
          component: ReadContent,
          beforeEnter: () => {
            if (!manager.hasLoadedSpec()) {
              return '/loading'
            }
          },
        },

        {
          path: 'focus',
          component: CookContent,
          beforeEnter: () => {
            if (!manager.hasLoadedSpec()) {
              return '/loading'
            }
          },
        },

        {
          path: 'explore',
          component: ExploreContent,
          beforeEnter: () => {
            if (!manager.hasLoadedSpec()) {
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
