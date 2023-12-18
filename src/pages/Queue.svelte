<script lang="ts">
	import { ImageQueueItem } from '$spark/queue';

	import type { QueueItem } from '$lib/types/Queue';

	let queueData: QueueItem[] = [
		{
			id: 1,
			batchID: 1,
			status: 'queued',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			completedAt: undefined,
			startedAt: undefined
		},
		{
			id: 2,
			batchID: 1,
			status: 'in_progress',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			completedAt: undefined,
			startedAt: undefined
		},
		{
			id: 3,
			batchID: 1,
			status: 'completed',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			completedAt: undefined,
			startedAt: undefined
		},
		{
			id: 4,
			batchID: 1,
			status: 'cancelled',
			createdAt: Date.now(),
			updatedAt: Date.now(),
			completedAt: undefined,
			startedAt: undefined
		}
	];
</script>

<div class="grid grid-cols-5 gap-2 hover:bg-background p-2 rounded-xl">
	<p class="text-right">#</p>
	<p>Status</p>
	<p>Time</p>
	<p>Item ID</p>
	<p>Batch ID</p>
</div>

<!--

	<div
	class="grid grid-cols-1 w-full grid-flow-row gap-2 overflow-y-scroll"
	style="max-height: calc(100vh - 108px);"
	>

</div>
-->
{#each queueData as data, i}
	<ImageQueueItem {data} {i} />
{/each}
