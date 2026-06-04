export class OpenCookingCancelledError extends Error {
  readonly code = 'PROCESS_CANCELLED'

  constructor() {
    super('OpenCooking processing cancelled')
  }
}
