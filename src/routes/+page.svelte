<script lang="ts">
  import Countdown from '$lib/Countdown.svelte'

  // $: {
  //   if (activeCycle) {
  //     document.title = `Work - ${minutes}:${seconds}`
  //   }
  // }
</script>

<Countdown time={25} shortRestTime={5} longRestTime={15} cyclesNumber={4} />
