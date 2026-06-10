import type { ThemeMode } from '@/types'
import { localStorageService } from './LocalStorageService'

class ThemeService {
  apply(mode: ThemeMode) {
    localStorageService.set('theme', mode)
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }
}

export const themeService = new ThemeService()
