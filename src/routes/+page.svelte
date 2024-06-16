<script lang="ts">
  import Countdown from '$lib/Countdown.svelte'

  // $: {
  //   if (activeCycle) {
  //     document.title = `Work - ${minutes}:${seconds}`
  //   }
  // }
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50 px-10"
>
  <div class="flex flex-col gap-10 w-full max-w-4xl mx-auto">
    <header class="flex w-full items-center justify-between">
      <strong class="text-3xl tracking-tighter">⌛ Verdandi</strong>

      <nav class="flex items-center gap-4">
        <a href="/">Timer</a>
        <a href="/history">History</a>
      </nav>
    </header>

    <main class="flex flex-col gap-8">
      <Countdown
        time={25}
        shortRestTime={0.1}
        longRestTime={15}
        cyclesNumber={4}
      />
    </main>

    <div class="mx-auto flex flex-col gap-6 items-center justify-center">
      <span>Completed pomodoros:</span>
      <!-- <span class="text-gray-400">Focus Time</span>
      <span class="text-gray-400">Focus Time</span> -->
    </div>
  </div>
</div>
