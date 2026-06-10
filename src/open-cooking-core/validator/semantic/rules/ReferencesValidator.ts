import type { Context } from '../../../'
import type { Path } from '../../../utils'
import type {
  OCSDocument,
  OCSEquipmentObject,
  OCSIngredientObject,
  OCSTechniqueObject,
} from '../../../schema'
import { SemanticValidationProcess } from '../../../process'
import { SemanticDiagnosticCode } from '../../../diagnostics'
import { CycleDetector, type ValidatorInterface } from './'

export class ReferencesValidator implements ValidatorInterface<OCSDocument> {
  private readonly collectedRefs: {
    registeredRefs: string[]
    ingredientRefs: string[]
    ingredientRecipeRefs: string[]
    equipmentRefs: string[]
    techniqueRefs: string[]
  } = {
    registeredRefs: [],
    ingredientRefs: [],
    ingredientRecipeRefs: [],
    equipmentRefs: [],
    techniqueRefs: [],
  }
  private REF_REGEX = /^#\/(ingredients|recipes|equipment|techniques)\/[a-zA-Z0-9_-]+$/

  validate(path: Path, document: OCSDocument, context: Context): void {
    const { registeredRefs, ...collectedRefs } = this.collectedRefs
    for (const refs of Object.values(collectedRefs)) {
      for (const ref of refs) {
        this.validateRef(ref, context)
        if (!registeredRefs.filter((r) => r === ref).length) {
          context.diagnosticsCollector.collect(
            SemanticValidationProcess.error({
              code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_NOT_FOUND,
              message: `Reference "${ref}" could not be resolved.`,
            }),
          )
        }
      }
    }

    for (const cycle of CycleDetector.detect(context.registry.graph)) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_CYCLIC,
          message: `Circular reference detected: ${cycle.join(' → ')}`,
        }),
      )
    }

    this.collectedRefs.ingredientRefs = []
    this.collectedRefs.ingredientRecipeRefs = []
    this.collectedRefs.equipmentRefs = []
    this.collectedRefs.techniqueRefs = []
    this.collectedRefs.registeredRefs = []
    context.registry.graph.reset()
  }

  registerRefs(path: Path) {
    this.collectedRefs.registeredRefs.push(`#/${[...path.tokens].join('/')}`)
  }

  collectIngredientRefs(from: string, ingredient: OCSIngredientObject, context: Context) {
    if (ingredient.$ref !== undefined) {
      if (!ingredient.$ref.match(/#\/ingredients/)) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_INVALID_FORMAT,
            message: `Reference target (${ingredient.$ref}) must resolve to an Ingredient object.`,
          }),
        )
      }
      this.collectRefInto(this.collectedRefs.ingredientRefs, from, ingredient.$ref, context)
    }
  }

  collectIngredientRecipeRef(from: string, ingredient: OCSIngredientObject, context: Context) {
    if (ingredient.recipe?.$ref !== undefined) {
      if (!ingredient.recipe.$ref.match(/#\/recipes/)) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_NOT_FOUND,
            message: `Reference target (${ingredient.recipe?.$ref}) must resolve to a Recipe object.`,
          }),
        )
      }
      this.collectRefInto(
        this.collectedRefs.ingredientRecipeRefs,
        from,
        ingredient.recipe?.$ref,
        context,
      )
    }
  }
  collectEquipmentRef(from: string, equipment: OCSEquipmentObject, context: Context) {
    if (equipment.$ref !== undefined) {
      if (!equipment.$ref.match(/#\/equipment/)) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_NOT_FOUND,
            message: `Reference target (${equipment.$ref}) must resolve to an Equipment object.`,
          }),
        )
      }
      this.collectRefInto(this.collectedRefs.equipmentRefs, from, equipment.$ref, context)
    }
  }
  collectTechniqueRefs(from: string, technique: OCSTechniqueObject, context: Context) {
    if (technique.$ref !== undefined) {
      if (!technique.$ref.match(/#\/techniques/)) {
        context.diagnosticsCollector.collect(
          SemanticValidationProcess.error({
            code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_NOT_FOUND,
            message: `Reference target (${technique.$ref}) must resolve to a Technique object.`,
          }),
        )
      }
      this.collectRefInto(this.collectedRefs.techniqueRefs, from, technique.$ref, context)
    }
  }

  private collectRefInto(collector: string[], from: string, ref: string, context: Context) {
    context.registry.graph.addEdge(from, ref)
    if (collector.indexOf(ref) === -1) {
      collector.push(ref)
    }
  }

  private validateRef(ref: string, context: Context) {
    if (!this.REF_REGEX.test(ref)) {
      context.diagnosticsCollector.collect(
        SemanticValidationProcess.error({
          code: SemanticDiagnosticCode.SEMANTIC_REFERENCE_INVALID_FORMAT,
          message: `Reference "${ref}" uses an invalid format.`,
        }),
      )
    }
  }
}

export const referencesValidator = new ReferencesValidator()
