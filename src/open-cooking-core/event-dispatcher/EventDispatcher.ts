import type { Context } from '../Context'
import type { Event } from './'

export class EventDispatcher {
  listeners: Map<string, ((event: Event<any>) => Promise<void> | void)[]> = new Map()

  private context!: Context
  addContext(context: Context) {
    this.context = context
  }

  addEventListener(type: string, callback: (event: Event<any>) => Promise<void> | void) {
    const callbacks = this.listeners.get(type) || []
    callbacks.push(callback)
    this.listeners.set(type, callbacks)
  }

  async emit(event: Event<any>) {
    if (this.listeners.has(event.type)) {
      const listeners = this.listeners.get(event.type) || []

      for (const listener of listeners) {
        this.context?.throwIfAborted()
        await listener(event)
        this.context?.throwIfAborted()
      }
    }
  }
}
