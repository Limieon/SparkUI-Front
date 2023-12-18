<script lang="ts">
	import type { QueueItemStatus } from '$lib/types/Queue';

	export let status: QueueItemStatus;
</script>

{#if status === 'queued'}
	<div class="bg-slate-700 rounded-xl w-fit pl-2 pr-3">
		<p>Queued</p>
	</div>
{:else if status === 'in_progress'}
	<div class="bg-amber-600 rounded-xl w-fit pl-2 pr-3">
		<p>In Progress</p>
	</div>
{:else if status === 'completed'}
	<div class="bg-green-700 rounded-xl w-fit pl-2 pr-3">
		<p>Completed</p>
	</div>
{:else if status === 'cancelled'}
	<div class="bg-red-700 rounded-xl w-fit pl-2 pr-3">
		<p>Cancelled</p>
	</div>
{/if}
