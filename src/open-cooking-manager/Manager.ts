import { OpenCookingProcessor } from '@/open-cooking-core'
import type { OpenCookingOutput } from '@/open-cooking-core/types'
import { FileLoader, type FileDescriptor } from './FileLoader'
import { EventListener } from './EventListener'
import { ref, type Ref } from 'vue'

class OpenCookingManager {
  loadedSpec: Ref<OpenCookingOutput | undefined> = ref()

  private controller?: AbortController
  readonly processor = new OpenCookingProcessor()
  readonly specs: FileDescriptor[] = FileLoader.loadSpecs()
  readonly eventListener: EventListener = new EventListener()
  private isInit = false

  hasLoadedSpec() {
    return this.loadedSpec.value !== undefined
  }
  loadedSpecIsValid() {
    return this.hasLoadedSpec() && this.loadedSpec.value?.data !== null
  }

  init() {
    if (this.isInit) {
      return
    }
    this.isInit = true
    this.processor.addListener('process-flow:start', (e) => this.eventListener.onStartFlow(e))
    this.processor.addListener('process-flow:end', (e) => this.eventListener.onEndFlow(e))
    this.processor.addListener('process:start', (e) => this.eventListener.onStartProcess(e))
    this.processor.addListener('process:end', (e) => this.eventListener.onEndProcess(e))

    const spec = this.specs[0]
    if (spec === undefined || spec.id === undefined) {
      console.log('cannot load spec')
      return
    }

    this.loadUrl(spec.id)
  }
  async loadUrl(url: string) {
    this.cancel()

    this.controller = new AbortController()
    this.loadedSpec.value = undefined

    this.loadedSpec.value = await this.processor.run({
      type: 'url',
      content: url,
      signal: this.controller.signal,
    })
  }

  cancel() {
    this.controller?.abort()
  }
}

let manager: OpenCookingManager

export function getOpenCookingManager(): OpenCookingManager {
  if (manager === undefined) {
    manager = new OpenCookingManager()
  }

  return manager
}
