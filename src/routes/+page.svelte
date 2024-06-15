<script lang="ts">
  import { differenceInSeconds } from 'date-fns'

  type Cycle = {
    id: string
    minutesAmount: number
    startDate: Date
    mode: 'work' | 'break'
  }

  let cycles: Cycle[] = []
  let activeCycleId: string | null = null
  let mode: 'work' | 'break' = 'work'
  let secondsPassed: number = 0

  let workMinutes: number = 25
  let breakMinutes: number = 5

  let interval: any = null

  function switchMode() {
    const nextMode: 'work' | 'break' = mode === 'work' ? 'break' : 'work'
    const nextMinutes = nextMode === 'work' ? workMinutes : breakMinutes

    mode = nextMode

    const newCycleId = crypto.randomUUID()

    activeCycleId = newCycleId

    const newCycle: Cycle = {
      id: newCycleId,
      mode,
      minutesAmount: nextMinutes,
      startDate: new Date(),
    }

    cycles = [newCycle, ...cycles]
    secondsPassed = 0
  }

  function tick() {
    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(() => {
      if (activeCycle) {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (diffInSeconds >= totalSeconds) {
          secondsPassed = totalSeconds
          switchMode()
        } else {
          secondsPassed = diffInSeconds
        }
      }
    }, 100)
  }

  function handleStartNewCycle() {
    const id = crypto.randomUUID()

    activeCycleId = id

    const newCycle: Cycle = {
      id,
      minutesAmount: 25,
      startDate: new Date(),
      mode,
    }

    cycles = [newCycle, ...cycles]
    secondsPassed = 0

    tick()
  }

  $: activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  $: totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  $: currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  $: minutesAmount = Math.floor(currentSeconds / 60)
  $: secondsAmount = currentSeconds % 60

  $: minutes = minutesAmount.toString().padStart(2, '0')
  $: seconds = secondsAmount.toString().padStart(2, '0')

  $: {
    if (activeCycle) {
      document.title = `Work - ${minutes}:${seconds}`
    }
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50 px-10"
>
  <main class="flex flex-col gap-10 w-full max-w-7xl mx-auto">
    {#if activeCycle}
      <h1 class="font-bold text-8xl text-center font-bebas tracking-wide">
        {`${minutes}:${seconds}`}
      </h1>
    {:else}
      <h1 class="font-bold text-8xl text-center font-bebas tracking-wide">
        25:00
      </h1>
    {/if}

    <footer class="flex items-center gap-8 mx-auto">
      <button
        on:click={handleStartNewCycle}
        type="button"
        class="px-3 py-2 rounded-lg font-medium bg-zinc-900"
      >
        Start
      </button>

      <button
        type="button"
        class="px-3 py-2 rounded-lg font-medium bg-zinc-900"
      >
        Stop
      </button>

      <button
        type="button"
        class="px-3 py-2 rounded-lg font-medium bg-zinc-900"
      >
        Reset
      </button>
    </footer>

    <div class="mx-auto flex flex-col gap-6 items-center justify-center">
      <span>Completed pomodoros:</span>
      <!-- <span class="text-gray-400">Focus Time</span>
      <span class="text-gray-400">Focus Time</span> -->
    </div>
  </main>
</div>
