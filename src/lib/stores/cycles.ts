import { writable } from 'svelte/store'

import type { Cycle } from '$lib/types/cycle'

type CycleStore = {
  cycles: Cycle[]
  activeCycle: Cycle | null
}

const initialCycleStore: CycleStore = {
  cycles: [],
  activeCycle: null,
}

export const cycleStore = writable<CycleStore>(initialCycleStore)
