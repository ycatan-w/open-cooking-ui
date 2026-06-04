import { Event } from './'

export class ProcessEvent extends Event<{
  time: number
  process: string
  job: any
}> {}
