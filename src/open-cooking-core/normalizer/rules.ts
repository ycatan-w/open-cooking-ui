import { Path, PathPattern } from '../utils'

// normalizer patterns
const NormalizerPatterns = {
  enum: [
    // additionalValues
    'additionalValues.recipeCategories.*',
    'additionalValues.recipeDifficulties.*',
    'additionalValues.ingredientCategories.*',
    'additionalValues.tags.*',
    'additionalValues.units.*',
    'additionalValues.techniqueCategories.*',
    'additionalValues.equipmentCategories.*',
    'additionalValues.annotationTypes.*',
    'additionalValues.mediaTypes.*',
    // recipes
    'recipes.*.category.*',
    'recipes.*.difficulty.value',
    'recipes.*.annotations.*.type',
    'recipes.*.media.*.type',
    // equipment
    'equipment.*.category',
    'equipment.*.annotations.*.type',
    'equipment.*.media.*.type',
    // techniques
    'techniques.*.category',
    'techniques.*.annotations.*.type',
    'techniques.*.media.*.type',
    // ingredients
    'ingredients.*.category',
    'ingredients.*.unit',
    'ingredients.*.annotations.*.type',
    'ingredients.*.media.*.type',
  ].map((path) => new PathPattern(path.split('.'))),
  duration: [
    // recipes
    'recipes.*.details.cook_time',
    'recipes.*.details.prep_time',
    'recipes.*.details.total_time',
  ].map((path) => new PathPattern(path.split('.'))),
}

// normalizer rules
export type NormalizerRule = {
  supports(path: Path, value: unknown): boolean
  normalize(value: unknown): unknown
}
const isString = (value: unknown): value is string => typeof value === 'string'
export const stringNormalizer: NormalizerRule = {
  supports: (_, value) => isString(value),

  normalize(value) {
    return isString(value) ? value.trim() : value
  },
}
export const enumNormalizer: NormalizerRule = {
  supports(path, value) {
    return isString(value) && NormalizerPatterns.enum.some((pattern) => pattern.match(path))
  },

  normalize(value) {
    return isString(value) ? value.trim().toLowerCase().replace(/\s+/g, '_') : value
  },
}
export const durationNormalizer: NormalizerRule = {
  supports(path, value) {
    return isString(value) && NormalizerPatterns.duration.some((pattern) => pattern.match(path))
  },

  normalize(value) {
    return isString(value) ? value.trim().toUpperCase() : value
  },
}
