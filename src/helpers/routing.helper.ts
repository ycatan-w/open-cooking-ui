import { Reference } from '@/open-cooking-core/runtime/objects'

export function toRouteId(id: string): string {
  return id.replace('#/recipes/', '')
}

export function routeIdToRecipeId(slug: string): string {
  return `#/recipes/${slug}`
}
export function routeIdToIngredientId(slug: string): string {
  return `#/ingredients/${slug}`
}
export function routeIdToTechniquesId(slug: string): string {
  return `#/techniques/${slug}`
}
export function routeIdToEquipmentId(slug: string): string {
  return `#/equipment/${slug}`
}

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const parts: string[] = []

  if (h > 0) {
    parts.push(`${h}h`)
  }

  if (m > 0) {
    parts.push(`${h > 0 ? m.toString().padStart(2, '0') : m}m`)
  }

  if (s > 0 || parts.length === 0) {
    parts.push(`${parts.length > 0 ? s.toString().padStart(2, '0') : s}s`)
  }

  return parts.join('')
}

type ResolveObject<T> = {
  type: 'inline' | 'reference'
  object: T
}

export function resolveRef<T extends object>(objects?: (T | Reference<T>)[]): ResolveObject<T>[] {
  return (objects || []).map((i) => resolveOneRef(i)).filter((i) => i.object !== undefined)
}

export function resolveOneRef<T extends object>(
  object?: T | Reference<T> | undefined,
): ResolveObject<T> {
  return (
    object instanceof Reference
      ? { object: object.resolve(), type: 'reference' }
      : { object: object, type: 'inline' }
  ) as ResolveObject<T>
}
