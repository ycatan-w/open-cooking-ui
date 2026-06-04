import type { Context } from '../../../'
import type { Path } from '../../../utils'

export interface ValidatorInterface<T> {
  validate(path: Path, document: T, context: Context): void
}
