<script lang="ts">
  type Cycle = {
    id: string
    minutesAmount: number
    startDate: Date
    mode: 'work' | 'break'
  }
  import { differenceInSeconds } from 'date-fns'

  export let time: number
  export let longRestTime: number
  export let shortRestTime: number
  export let cyclesNumber: number

  let completedCycles = 0
  let pomodoroAmount = 0

  let cycles: Cycle[] = []
  let activeCycleId: string | null = null
  let mode: 'work' | 'break' = 'break'

  let secondsPassed: number = 0

  let interval: any = null

  function switchMode() {
    const nextMode: 'work' | 'break' = mode === 'work' ? 'break' : 'work'
    let nextMinutes = nextMode === 'work' ? 0.1 : 0.1

    if (mode == 'work') {
      completedCycles += 1
      pomodoroAmount += 1

      if (completedCycles % cyclesNumber === 0) {
        nextMinutes = longRestTime
      } else {
        nextMinutes = shortRestTime
      }
    }
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

    mode = 'work'

    activeCycleId = id

    const newCycle: Cycle = {
      id,
      minutesAmount: 0.1,
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
</script>

<h2 class="text-xl text-center">
  You are: {mode === 'work' ? 'working' : 'resting'}
</h2>

<h2 class="text-xl text-center">completed cycles: {completedCycles}</h2>
<h2 class="text-xl text-center">
  pomodoro {pomodoroAmount % cyclesNumber === 0 &&
    pomodoroAmount / cyclesNumber}
</h2>

{#if activeCycle}
  <h1 class="font-bold text-9xl text-center font-bebas tracking-wide">
    {`${minutes}:${seconds}`}
  </h1>
{:else}
  <h1 class="font-bold text-9xl text-center font-bebas tracking-wide">25:00</h1>
{/if}

<footer class="flex items-center gap-8 mx-auto">
  <button
    on:click={handleStartNewCycle}
    type="button"
    class="px-3 py-2 rounded-lg font-medium bg-zinc-900"
  >
    Start
  </button>

  <button type="button" class="px-3 py-2 rounded-lg font-medium bg-zinc-900">
    Stop
  </button>

  <button type="button" class="px-3 py-2 rounded-lg font-medium bg-zinc-900">
    Reset
  </button>
</footer>
