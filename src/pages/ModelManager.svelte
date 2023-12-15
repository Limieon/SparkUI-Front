<script lang="ts">
	import type { CheckpointData, PageData } from '$lib/types/PageData';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';

	import { Checkpoint } from '$spark/modelManager';
	import { Popup } from '$spark/popup';

	export let data: PageData;

	let checkpoints: CheckpointData[] = data.checkpoints;
	console.log(checkpoints);

	let subPage = 0;

	let deletePopups: boolean[] = [];
</script>

<div>
	<div>
		<Button
			class="w-32"
			variant={subPage == 0 ? 'default' : 'outline'}
			on:click={() => {
				subPage = 0;
			}}>Installed Models</Button
		>
		<Button
			variant={subPage == 1 ? 'default' : 'outline'}
			on:click={() => {
				subPage = 1;
			}}>Get new Models</Button
		>
	</div>

	<div class="pt-2">
		{#if subPage == 0}
			<!-- Installed Models -->
			{#each checkpoints as c, i}
				<Checkpoint
					name={c.name}
					description={c.description}
					modelPage={c.checkpoint_page}
					preview={c.preview_url}
				></Checkpoint>
			{/each}
		{:else if subPage == 1}
			<!-- Get new models -->
		{/if}
	</div>
</div>
