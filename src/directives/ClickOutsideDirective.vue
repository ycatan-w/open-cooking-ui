<script lang="ts">
import type { DirectiveBinding, ObjectDirective } from 'vue'

const listeners = new WeakMap<HTMLElement, EventListener>()

export const vClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const listener: EventListener = (event) => {
      const target = event.target as Node

      if (!(el === target || el.contains(target))) {
        binding.value(event)
      }
    }

    listeners.set(el, listener)

    document.addEventListener('click', listener)
  },

  unmounted(el: HTMLElement) {
    const listener = listeners.get(el)

    if (listener) {
      document.removeEventListener('click', listener)
      listeners.delete(el)
    }
  },
}
</script>