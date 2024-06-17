<script lang="ts">
  import type { Cycle } from '$lib/types/cycle'
  import { cycleStore } from '$lib/stores/cycles'
  import { addCycle, setActiceCycle } from '$lib/actions/cycles'

  import { differenceInSeconds } from 'date-fns'

  export let time: number
  export let longRestTime: number
  export let shortRestTime: number
  export let cyclesNumber: number

  let completedCycles = 0
  let pomodoroAmount = 0

  let isPaused = false
  let pausedAt: Date | null = null

  let mode: 'work' | 'break' = 'break'

  let secondsPassed: number = 0

  let interval: any = null

  function switchMode() {
    const nextMode: 'work' | 'break' = mode === 'work' ? 'break' : 'work'
    let nextMinutes = nextMode === 'work' ? time : shortRestTime

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

    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      mode,
      minutesAmount: nextMinutes,
      startDate: new Date(),
    }

    addCycle({
      cycle: newCycle,
    })

    setActiceCycle(newCycle.id)

    secondsPassed = 0
  }

  function tick() {
    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(() => {
      if (isPaused) return

      if ($cycleStore.activeCycle) {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          $cycleStore.activeCycle?.startDate,
        )

        if (diffInSeconds >= totalSeconds) {
          secondsPassed = totalSeconds
          switchMode()
        } else {
          secondsPassed = diffInSeconds
        }
      }
    }, 1000)
  }

  function handleStartNewCycle() {
    mode = 'work'

    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      minutesAmount: time,
      startDate: new Date(),
      mode,
    }

    addCycle({
      cycle: newCycle,
    })

    setActiceCycle(newCycle.id)

    secondsPassed = 0

    tick()
  }

  function handleToggleCountdown() {
    if (isPaused) {
      if (pausedAt) {
        const pausedDuration = differenceInSeconds(new Date(), pausedAt)
        $cycleStore.activeCycle!!.startDate = new Date(
          $cycleStore.activeCycle!!.startDate.getTime() + pausedDuration * 1000,
        )
      }
      pausedAt = null
    } else {
      pausedAt = new Date()
    }
    isPaused = !isPaused
  }

  $: totalSeconds = $cycleStore.activeCycle
    ? $cycleStore.activeCycle.minutesAmount * 60
    : 0
  $: currentSeconds = $cycleStore.activeCycle ? totalSeconds - secondsPassed : 0

  $: minutesAmount = Math.floor(currentSeconds / 60)
  $: secondsAmount = currentSeconds % 60

  $: minutes = minutesAmount.toString().padStart(2, '0')
  $: seconds = secondsAmount.toString().padStart(2, '0')

  $: {
    if ($cycleStore.activeCycle) {
      document.title = `${mode === 'work' ? 'Working' : 'Resting'} - ${minutes}:${seconds}`
    }
  }
</script>

<div class="flex flex-col gap-1 items-center justify-center">
  <h2 class="text-xl">You are:</h2>

  <span class="text-lg text-zinc-700">
    {mode === 'work' ? 'Working' : 'Resting'}
  </span>
</div>

{#if $cycleStore.activeCycle}
  <h1 class="font-bold text-9xl text-center font-bebas tracking-wide">
    {`${minutes}:${seconds}`}
  </h1>
{:else}
  <h1 class="font-bold text-9xl text-center font-bebas tracking-wide">25:00</h1>
{/if}

<footer class="flex flex-col items-center gap-6 mx-auto">
  <div class=" flex items-center gap-6">
    <button
      on:click={handleStartNewCycle}
      type="button"
      class="px-3 py-2 rounded-lg text-sm font-medium bg-gray-900 duration-300 transition-all ease-in-out hover:bg-gray-800"
    >
      Start
    </button>

    <button
      disabled={!$cycleStore.activeCycle}
      on:click={handleToggleCountdown}
      type="button"
      class="disabled:cursor-not-allowed disabled:opacity-60 px-3 py-2 rounded-lg text-sm font-medium bg-gray-900 duration-300 transition-all ease-in-out hover:bg-gray-800"
    >
      {isPaused ? ' Resume' : 'Pause'}
    </button>
  </div>

  <span class="block">
    completed cycles: <span class="text-zinc-400">{completedCycles}</span>
  </span>

  <span class="block">
    full cycles completed: <span class="text-zinc-400">
      {pomodoroAmount % cyclesNumber === 0 ? pomodoroAmount / cyclesNumber : 0}
    </span>
  </span>
</footer>
