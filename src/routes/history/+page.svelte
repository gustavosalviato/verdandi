<script lang="ts">
  import { cycleStore } from '$lib/stores/cycles'
  import { format } from 'date-fns'
</script>

<div class="w-full overflow-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b">
        <th
          class="h-12 px-2 text-left align-middle font-medium text-secondary [&:has([role=checkbox])]:pr-0"
        >
          Date
        </th>
        <th
          class="h-12 px-2 text-left align-middle font-medium text-secondary [&:has([role=checkbox])]:pr-0"
        >
          Minutes
        </th>
        <th
          class="h-12 px-2 text-left align-middle font-medium text-secondary [&:has([role=checkbox])]:pr-0"
        >
          Mode
        </th>
      </tr>
    </thead>
    <tbody>
      {#each $cycleStore.cycles as cycle}
        <tr>
          <td
            class="p-2 align-middle text-gray-50 [&:has([role=checkbox])]:pr-0"
          >
            <span class="block">
              {format(new Date(cycle.startDate), 'dd/MM/yyy')}
            </span>

            <span class="block text-xs text-zinc-600">
              {format(new Date(cycle.startDate), 'HH:mm')}
            </span>
          </td>
          <td
            class="p-2 align-middle text-gray-50 [&:has([role=checkbox])]:pr-0"
          >
            {cycle.minutesAmount}
          </td>
          <td
            class="p-2 align-middle text-gray-50 [&:has([role=checkbox])]:pr-0"
          >
            <div class="flex items-center gap-1">
              <span
                class={`flex size-2 rounded-full ${cycle.mode === 'work' ? 'bg-emerald-500' : 'bg-amber-100'}`}
              />
              <span>
                {cycle.mode}
              </span>
            </div>
            <span> </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
