import { writable } from 'svelte/store'

import type { Cycle } from '$lib/types/cycle'

type CycleStore = {
  cycles: Cycle[]
  activeCycle: Cycle | null
  completedCycles: number
  fullCompletedCycles: number
}

const initialCycleStore: CycleStore = {
  cycles: [],
  activeCycle: null,
  completedCycles: 0,
  fullCompletedCycles: 0,
}

export const cycleStore = writable<CycleStore>(initialCycleStore)
