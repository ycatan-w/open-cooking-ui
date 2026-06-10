import type { OpenCookingOutput } from '@/open-cooking-core/types'
import type { FileDescriptor } from '@/open-cooking-manager/FileLoader'
import { ref, type Ref } from 'vue'
import { localStorageService } from '@/services/LocalStorageService'

const definition: Ref<OpenCookingOutput | undefined> = ref()
const filename = ref<string | null>(null)
const specUrl = ref<string | null>(null)
const spec = ref<FileDescriptor | null>(localStorageService.get('spec'))
const recipeId = ref<string | null>(localStorageService.get('recipeId'))

export function useDocumentStore() {
  return {
    // filename,
    spec,
    recipeId,
    // definition,
  }
}
