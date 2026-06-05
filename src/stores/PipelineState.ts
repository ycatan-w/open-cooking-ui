import { reactive } from 'vue'

export const pipelineState = reactive<{
  running: boolean

  progress: number

  current: number
  total: number
  processesInfo: { name: string }[]
  completed: string[]

  currentProcess: string

  startAt: number
  endAt: number

  duration: number
}>({
  running: false,

  progress: 0,

  current: 0,
  total: 0,
  processesInfo: [],
  completed: [],

  currentProcess: '',

  startAt: 0,
  endAt: 0,

  duration: 0,
})
