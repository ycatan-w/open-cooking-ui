import { localStorageService } from '@/services/LocalStorageService'
import type { ThemeMode } from '@/types'
import { ref } from 'vue'

const theme = ref<ThemeMode>(
  localStorageService.get('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
)
export function useSettingsStore() {
  return {
    theme,
  }
}
