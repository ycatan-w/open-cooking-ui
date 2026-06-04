import type { Option } from './types'

export class Config {
  readonly options: Option
  constructor(options: Option) {
    this.options = { ...options }
  }
}
