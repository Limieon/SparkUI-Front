<script lang="ts">
	import { onMount } from 'svelte';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';

	import { CheckpointCard } from '$spark/modelImporter';

	import { Download as IconInstall, Scan as IconSelectAll } from 'lucide-svelte';

	let status = '';
	let modelUrl = '';
	let modelID = 0;

	import { MessageBox } from '$lib/stores';

	onMount(fetchModel);

	async function fetchModel() {
		modelData = {};

		if (modelUrl === '') return;

		status = 'Loading...';

		if (modelUrl.includes('?')) modelUrl = modelUrl.substring(0, modelUrl.indexOf('?'));
		const r = /(?:https:\/\/civitai\.com\/models\/)(\d+)(?:\/?\??\w*=\d*)?/gm.exec(modelUrl);
		if (r == undefined || r.length < 1) {
			status = 'Invalid URL!';
			return;
		}

		modelID = Number.parseInt(r[1]);
		const res = await fetch(`https://civitai.com/api/v1/models/${modelID}`);
		const data = await res.json();

		modelData = data;
		status = '';
	}

	let modelData: any = {};

	let selectedModels: { [key: string]: boolean } = {};

	function selectAll() {
		for (var m of Object.keys(selectedModels)) {
			selectedModels[m] = true;
		}
	}
	function clearSelection() {
		for (var m of Object.keys(selectedModels)) {
			selectedModels[m] = false;
		}
	}
	function toggleSelection() {
		for (var m of Object.keys(selectedModels)) {
			selectedModels[m] = !selectedModels[m];
		}
	}

	async function installModels() {
		const models: number[] = [];
		for (var handle of Object.keys(selectedModels).filter((key) => selectedModels[key] === true)) {
			models.push(Number.parseInt(handle));
		}

		console.log(`Installing ${models}`);
		await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/civitai/import/${modelID}`, {
			method: 'POST',
			body: JSON.stringify(models),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		$MessageBox.open({
			title: 'Downloading...',
			message: `Your models are now being downloaded! Depending on the size and models this can take several minutes, depending on your internet connection!`,
			onConfirm: installModels
		});
		$MessageBox.close();

		open = false;
	}

	let selectedModelCount: number = 0;
	$: selectedModelCount = Object.values(selectedModels).filter((value) => value === true).length;

	export let open: boolean;
</script>

<div class="w-full h-full">
	<h2 class="text-2xl mb-2">Enter CivitAI URL:</h2>
	<Input placeholder="Model Page" bind:value={modelUrl} on:change={fetchModel} />

	{#if status !== ''}
		<h2 class="text-xl">{status}</h2>
	{/if}
	{#if modelData != undefined && modelData.modelVersions != undefined}
		<div
			class="grid grid-cols-9 gap-2 m-2 h-full overflow-y-auto overflow-x-hidden"
			style="height: calc(100% - 128px);"
		>
			{#each modelData.modelVersions as m, i}
				<CheckpointCard
					name={m.name}
					description=""
					preview={m.images[0].url}
					sdVersion={m.baseModel}
					onSelect={() => {}}
					bind:selected={selectedModels[m.id]}
				/>
			{/each}
		</div>
	{/if}

	{#if selectedModels != undefined && Object.keys(modelData).length > 0}
		<Separator class="mb-2" />
		<div class="w-full h-8">
			<div class="w-fit float-right grid grid-rows-1 grid-flow-col gap-2">
				{#if selectedModelCount > 0}
					<Button
						on:click={() => {
							$MessageBox.open({
								title: 'Install Models',
								message: `You really want to install ${selectedModelCount} additional checkpoints?`,
								onConfirm: installModels
							});
						}}><IconInstall class="mr-4" />Install Models</Button
					>
					<Separator orientation="vertical" />
				{/if}
				<Button on:click={selectAll}><IconSelectAll class="mr-4" />Select All</Button>
				<Button on:click={toggleSelection}><IconSelectAll class="mr-4" />Toggle Selection</Button>
				<Button on:click={clearSelection} variant="destructive"
					><IconSelectAll class="mr-4" />Clear Selection</Button
				>
			</div>

			<h2 class="text-lg">
				{#if modelData.modelVersions != undefined}
					Selected Models: {selectedModelCount}/{modelData.modelVersions.length}
				{/if}
			</h2>
		</div>
	{/if}
</div>
