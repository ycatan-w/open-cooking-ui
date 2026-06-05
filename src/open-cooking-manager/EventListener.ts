import type { ProcessEvent, ProcessFlowEvent } from '@/open-cooking-core/event-dispatcher'
import type { OpenCookingProcessJob } from '@/open-cooking-core/types'
import { localSpecFormat } from '@/stores/LocalSpecInfo'
import { pipelineState } from '@/stores/PipelineState'

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}
async function sleeprand() {
  const randNb = getRandomIntInclusive(3, 10)
  console.log(`sleep for: ${randNb}s`)
  await sleep(randNb * 1000)
}

export class EventListener {
  private flowStartAt: number = 0
  private flowEndAt: number = 0
  private processStartAt: number = 0
  private processEndAt: number = 0
  private processLength: number = 0
  private currentProcessNumber: number = 0

  async onStartFlow(e: ProcessFlowEvent) {
    this.flowStartAt = e.context?.time || Date.now()

    localSpecFormat.value = null

    pipelineState.running = true
    pipelineState.progress = 0
    pipelineState.current = 0
    pipelineState.total = e.context?.processesInfo?.length || 0
    pipelineState.processesInfo = e.context?.processesInfo || []
    pipelineState.completed = []

    pipelineState.startAt = this.flowStartAt

    // ----
    this.processLength = e.context?.processesInfo?.length || 0
    this.currentProcessNumber = 0
    this.flowEndAt = 0
    this.processStartAt = 0
    this.processEndAt = 0

    console.log(
      `[ProcessFlow] started at ${new Date(this.flowStartAt).toUTCString()} for ${e.context?.processesInfo?.length || 0} processes.`,
    )
    // await sleeprand()
  }
  async onEndFlow(e: ProcessFlowEvent) {
    const end = e.context?.time || Date.now()

    pipelineState.running = false
    pipelineState.progress = 100
    pipelineState.endAt = end
    pipelineState.duration = end - this.flowStartAt

    // ----
    this.flowEndAt = e.context?.time || 0
    console.log(
      `[ProcessFlow] ended at ${new Date(this.flowEndAt).toUTCString()} for ${e.context?.processesInfo?.length || 0} processes and took ${this.flowEndAt - this.flowStartAt}ms.`,
    )
    // await sleeprand()
  }
  async onStartProcess(e: ProcessEvent) {
    if (this.isJobOpenCookingProcessJob(e.context?.job) && localSpecFormat.value === null) {
      console.log(localSpecFormat.value)
      localSpecFormat.value = e.context.job.context.storage.format || null
    }

    pipelineState.current += 1

    pipelineState.currentProcess = e.context?.process || 'unknown'

    pipelineState.progress = (pipelineState.current / pipelineState.total) * 100
    // ----
    this.processStartAt = e.context?.time || 0
    this.currentProcessNumber++
    console.log(
      `[Process][${e.context?.process || 'unnamed'}][${this.currentProcessNumber}/${this.processLength}] started at ${new Date(this.processStartAt).toUTCString()} for ${e.context?.process || 'unnamed'} process.`,
    )
    console.log(`input ->`, e.context?.job)
    const randNb = getRandomIntInclusive(3, 10)
    console.log(`sleep for: ${randNb}s`)

    // await e.context?.job?.context.sleep(randNb * 1000)
    // await sleeprand()
  }
  async onEndProcess(e: ProcessEvent) {
    if (this.isJobOpenCookingProcessJob(e.context?.job) && localSpecFormat.value === null) {
      localSpecFormat.value = e.context.job.context.storage.format || null
    }
    if (e?.context?.process !== undefined && e?.context?.job?.status === 'complete') {
      pipelineState.completed.push(e.context.process)
    }
    // ----
    this.processEndAt = e.context?.time || 0
    console.log(
      `[Process][${e.context?.process || 'unnamed'}][${this.currentProcessNumber}/${this.processLength}] ended at ${new Date(this.processEndAt).toUTCString()} for ${e.context?.process || 'unnamed'} process and took ${this.processEndAt - this.processStartAt}ms.`,
    )
    console.log(`output ->`, e.context?.job)
    // await sleeprand()
  }

  private isJobOpenCookingProcessJob(job: any): job is OpenCookingProcessJob<any, any> {
    return job !== undefined
  }
}

const eventListener = new EventListener()
export function getOpenCookingEventListener(): EventListener {
  return eventListener
}
