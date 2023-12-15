<script lang="ts">
	import { onMount } from 'svelte';

	import type { CheckpointData, PageData } from '$lib/types/PageData';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { Checkpoint, CheckpointCard } from '$spark/modelManager';
	import { Popup } from '$spark/popup';

	import { Plus as IconAdd } from 'lucide-svelte';

	export let data: PageData;

	let checkpoints: CheckpointData[] = data.checkpoints;
	console.log(checkpoints);

	let deletePopups: boolean[] = [];

	let installModelOpen = true;
	let installModel_type = 0;
	let installModel_base = 0;
</script>

<div class="w-full h-full">
	<div class="block">
		<Button
			class=""
			variant="default"
			on:click={() => {
				installModelOpen = true;
			}}><IconAdd class="inline mr-2" /> Install Model</Button
		>
	</div>

	<Separator class="mt-2" />

	<div class="pt-2 w-full h-full">
		<!-- Installed Models -->
		{#each checkpoints as c, i}
			<Checkpoint
				name={c.name}
				description={c.description}
				modelPage={c.checkpoint_page}
				preview={c.preview_url}
				sdVersion="sd1.5"
			></Checkpoint>
		{/each}
	</div>
</div>

<Popup title="Install new Model" bind:open={installModelOpen}>
	<div class="grid grid-cols-2 grid-rows-1 w-full gap-2">
		<div>
			<h2 class="text-2xl mb-2">Model Type</h2>
			<div class="grid grid-rows-1 grid-flow-col gap-2">
				<Button
					variant={installModel_type == 0 ? 'default' : 'outline'}
					on:click={() => {
						installModel_type = 0;
					}}>Checkpoint</Button
				>
				<Button
					variant={installModel_type == 1 ? 'default' : 'outline'}
					on:click={() => {
						installModel_type = 1;
					}}>LoRA</Button
				>
				<Button
					variant={installModel_type == 2 ? 'default' : 'outline'}
					on:click={() => {
						installModel_type = 2;
					}}>Embedding</Button
				>
			</div>
		</div>

		<div>
			{#if installModel_type == 0 || installModel_type == 1}
				<h2 class="text-2xl mb-2">Base Model</h2>
				<div class="grid grid-rows-1 grid-flow-col gap-2">
					{#each ['SD 1.5', 'SD 2.1', 'SDXL', 'SDXL - Turbo'] as base, i}
						<Button
							variant={installModel_base == i ? 'default' : 'outline'}
							on:click={() => {
								installModel_base = i;
							}}>{base}</Button
						>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<Separator class="mt-2 mb-2" />
</Popup>
