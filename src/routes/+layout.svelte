<script lang="ts">
  import '../app.css'
  import { page } from '$app/stores'

  import { Clock, History } from 'lucide-svelte/icons'
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen text-gray-50 px-10 to-rose-500bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r"
>
  <div
    class="flex flex-col gap-10 w-full max-w-6xl mx-auto bg-zinc-900 rounded-xl py-16 px-20"
  >
    <header class="flex w-full items-center justify-between">
      <strong class="text-2xl tracking-tighter">⌛ Verdandi</strong>

      <nav class="flex items-center gap-4">
        <a
          href="/"
          title="Countdown"
          class={`${$page.route.id === '/' && 'text-amber-100'}`}><Clock /></a
        >
        <a
          href="/history"
          title="Cycles history"
          class={`${$page.route.id === '/history' && 'text-amber-100'}`}
        >
          <History />
        </a>
      </nav>
    </header>

    <main class="flex flex-col gap-8">
      <slot />
    </main>
  </div>
</div>
