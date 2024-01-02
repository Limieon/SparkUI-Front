<script lang="ts">
	import ModelQueueItem from './ModelQueueItem.svelte';

	import { Socket_CivitAIImporterUpdate as data } from '$lib/stores';
</script>

<div
	class="grid grid-cols-1 grid-flow-row mt-2 w-full h-min overflow-y-scroll"
	style="max-height: calc(100vh - 191px);"
>
	{#if $data != undefined}
		<ModelQueueItem
			name={$data.name}
			handle={$data.handle}
			preview_url={$data.preview_url}
			current={$data.current}
			size={$data.size}
		/>

		{#each $data.queue as model}
			<ModelQueueItem
				name={model.name}
				handle={model.handle}
				preview_url={model.preview_url}
				current={0}
				size={0}
			/>
		{/each}
	{/if}
</div>
