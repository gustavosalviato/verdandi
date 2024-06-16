<script>
  import '../app.css'
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen text-gray-50 px-10 bg-gradient-to-r from-rose-300 to-rose-500"
>
  <div
    class="flex flex-col gap-10 w-full max-w-6xl mx-auto bg-zinc-900 rounded-xl py-16 px-20"
  >
    <header class="flex w-full items-center justify-between">
      <strong class="text-2xl tracking-tighter">⌛ Verdandi</strong>

      <nav class="flex items-center gap-4">
        <a href="/">Timer</a>
        <a href="/history">History</a>
      </nav>
    </header>

    <main class="flex flex-col gap-8">
      <slot />
    </main>

    <div class="mx-auto flex flex-col gap-6 items-center justify-center">
      <span>Completed pomodoros:</span>
    </div>
  </div>
</div>

<slot />
