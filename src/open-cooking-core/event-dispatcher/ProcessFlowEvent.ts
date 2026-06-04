import { Event } from './'

export class ProcessFlowEvent extends Event<{
  time: number
  processesInfo?: { name: string }[]
}> {}
