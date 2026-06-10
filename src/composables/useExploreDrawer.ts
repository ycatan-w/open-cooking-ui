import {
  AnnotationView,
  EquipmentView,
  IngredientView,
  MediaView,
  SourceView,
  TechniqueView,
} from '@/components/readRecipe'
import type {
  Annotation,
  Equipment,
  Ingredient,
  Media,
  Technique,
} from '@/open-cooking-core/runtime/objects'
import { computed, ref } from 'vue'

export type DrawerState =
  | {
      type: 'annotation'
      annotations: Annotation[]
    }
  | {
      type: 'media'
      media: Media[]
    }
  | undefined
const drawerView = ref<DrawerState>()
const drawerComponent = computed(() => {
  switch (drawerView.value?.type) {
    case 'annotation':
      return {
        component: AnnotationView,
        props: {
          annotations: drawerView.value.annotations,
        },
      }

    case 'media':
      return {
        component: MediaView,
        props: {
          media: drawerView.value.media,
        },
      }
  }
})
export function useExploreDrawer() {
  return {
    drawerView,
    drawerComponent,
  }
}
