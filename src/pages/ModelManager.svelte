<script lang="ts">
	import { onMount } from 'svelte';
	
	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import type { Checkpoint  } from '$lib/types/Checkpoint';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { Checkpoint as CCheckpoint, CheckpointCard } from '$spark/modelManager';
	import { Popup } from '$spark/popup';

	import { Plus as IconAdd } from 'lucide-svelte';

	import ModelImporter from './sections/ModelImporter.svelte';

	let deletePopups: boolean[] = [];

	let installModel_open = false;
	let installModel_type = 0;
	let installModel_base = 0;

	let importModel_open = false;

	let page = 0;

	onMount(async () => {
		const checkpoints = await (
			await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints`)
		).json();

		for (var c of checkpoints) {
			const variations = await (
				await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints/${c}`)
			).json();

			for (var v of variations.variations) {
				models_handles[v.handle] = models.length;
				models.push({
					handle: v.handle,
					name: v.name,
					preview_url: v.preview_url
				});
			}
		}

		models = [...models]; // Update models
	});

	let models: Checkpoint[] = []; 
	let models_handles: { [key: string]: number } = {};
	export let selected: Checkpoint | null = null;
</script>

<div class="w-full h-full">
	<div class="grid grid-rows-1 grid-cols-2 grid-flow-col gap-2 w-1/4">
		<Button
			class=""
			variant="default"
			on:click={() => {
				installModel_open = true;
			}}><IconAdd class="inline mr-2" />Install Model...</Button
		>
		<Button
			class=""
			variant="default"
			on:click={() => {
				importModel_open = true;
			}}><IconAdd class="inline mr-2" />Import Model from CivitAI...</Button
		>
	</div>

	<Separator class="mt-2 mb-4" />

	<div class="grid grid-rows-1 grid-cols-2 grid-flow-col gap-2">
		<Button
			class=""
			variant={page === 0 ? 'default' : 'outline'}
			on:click={() => {
				page = 0;
			}}>Installed Models</Button
		>
		<Button
			class=""
			variant={page === 1 ? 'default' : 'outline'}
			on:click={() => {
				page = 1;
			}}>Model Queue</Button
		>
	</div>

	{#if page === 0}
		<div class="pt-2 w-full h-full">
			<!-- Installed Models -->
			{#each models as c, i}
				<CCheckpoint
					name={c.name}
					description=""
					modelPage=""
					preview={c.preview_url}
					sdVersion="sd1.5"
				></CCheckpoint>
			{/each}
		</div>
	{:else if page === 1}{/if}
</div>

<Popup title="Install new Model" bind:open={installModel_open}>
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

<Popup title="Import new Model" bind:open={importModel_open}
	><ModelImporter bind:open={importModel_open} /></Popup
>
