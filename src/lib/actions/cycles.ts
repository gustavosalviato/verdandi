import { cycleStore } from '$lib/stores/cycles'
import type { Cycle } from '$lib/types/cycle'

interface AddNewCycleRequest {
  cycle: Cycle
}

export function addCycle({ cycle }: AddNewCycleRequest) {
  cycleStore.update(store => {
    return {
      ...store,
      cycles: [cycle, ...store.cycles],
    }
  })
}

export function setActiceCycle(id: string) {
  cycleStore.update(store => {
    const activeCycle = store.cycles.find(cycle => cycle.id === id)

    return {
      ...store,
      activeCycle: activeCycle ? activeCycle : null,
    }
  })
}
