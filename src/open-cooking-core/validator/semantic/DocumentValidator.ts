import type { Context } from '../../'
import { Path } from '../../utils'
import type {
  OCSAdditionalValuesObject,
  OCSDocument,
  OCSEquipmentObject,
  OCSIngredientObject,
  OCSRecipeObject,
  OCSTechniqueObject,
} from '../../schema'
import {
  equipmentValidator,
  rootValidator,
  informationValidator,
  idValidator,
  recipesValidator,
  ingredientsValidator,
  techniquesValidator,
  referencesValidator,
  type ValidatorInterface,
  annotationsValidator,
  mediasValidator,
} from './rules'

type DocumentValidatorDetails<T> = {
  keyname: 'equipment' | 'ingredients' | 'techniques' | 'recipes'
  validator: ValidatorInterface<T>
  objects: Record<string, T> | undefined
}

export class DocumentValidator {
  validate(document: OCSDocument, context: Context) {
    const rootPath = new Path([])
    this.pullAdditionalValues(document.additionalValues)

    rootValidator.validate(rootPath, document, context)
    informationValidator.validate(rootPath.child('info'), document.info, context)
    // equipment
    this.validateObjects<OCSEquipmentObject>(
      rootPath,
      {
        keyname: 'equipment',
        validator: equipmentValidator,
        objects: document.equipment,
      },
      context,
    )
    // ingredients
    this.validateObjects<OCSIngredientObject>(
      rootPath,
      {
        keyname: 'ingredients',
        validator: ingredientsValidator,
        objects: document.ingredients,
      },
      context,
    )
    // techniques
    this.validateObjects<OCSTechniqueObject>(
      rootPath,
      {
        keyname: 'techniques',
        validator: techniquesValidator,
        objects: document.techniques,
      },
      context,
    )
    // recipes
    this.validateObjects<OCSRecipeObject>(
      rootPath,
      {
        keyname: 'recipes',
        validator: recipesValidator,
        objects: document.recipes,
      },
      context,
    )

    referencesValidator.validate(rootPath, document, context)

    return document
  }

  private validateObjects<ObjectType>(
    path: Path,
    details: DocumentValidatorDetails<ObjectType>,
    context: Context,
  ) {
    if (this.isObjectsNotUndefined<ObjectType>(details.objects)) {
      const childPath = path.child(details.keyname)
      for (const [id, object] of Object.entries(details.objects)) {
        idValidator.validate(childPath, id, context)
        details.validator.validate(childPath.child(id), object, context)
      }
    }
  }

  private isObjectsNotUndefined<T>(objects: unknown): objects is Record<string, T> {
    return objects !== undefined
  }

  private pullAdditionalValues(additionalValues: OCSAdditionalValuesObject | undefined) {
    recipesValidator.additionalDifficultyEnums = additionalValues?.recipeDifficulties || []
    recipesValidator.additionalEnums = additionalValues?.recipeCategories || []
    ingredientsValidator.additionalEnums = additionalValues?.ingredientCategories || []
    ingredientsValidator.additionalUnitEnums = additionalValues?.units || []
    techniquesValidator.additionalEnums = additionalValues?.techniqueCategories || []
    equipmentValidator.additionalEnums = additionalValues?.equipmentCategories || []
    annotationsValidator.additionalEnums = additionalValues?.annotationTypes || []
    mediasValidator.additionalEnums = additionalValues?.mediaTypes || []
  }
}

export const documentValidator = new DocumentValidator()
