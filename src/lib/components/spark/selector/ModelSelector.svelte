<script lang="ts">
	import { onMount } from 'svelte';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { Checkpoint } from '$lib/types/Checkpoint';

	import Combobox from '$spark/Combobox.svelte';
	import { Popup } from '$spark/popup';

	export let open: boolean = true;

	let searchPrompt: string = '';

	const sdBaseTypes = [
		{
			label: 'StableDiffusion v1.5',
			value: 'StableDiffusion v1.5'
		},
		{
			label: 'StableDiffusion v2.1',
			value: 'StableDiffusion v2.1'
		},
		{
			label: 'StableDiffusionXL v1.0',
			value: 'StableDiffusionXL v1.0'
		},
		{
			label: 'StableDiffusionXL v1.0 - Turbo',
			value: 'StableDiffusionXL v1.0 - Turbo'
		}
	];

	async function fetchCheckpoints() {
		const checkpoints = await (
			await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints`)
		).json();

		for (var c of checkpoints) {
			const variations = await (
				await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints/${c}`)
			).json();

			for (var v of variations.variations) {
				models.push({
					handle: v.handle,
					name: v.name,
					preview_url: v.preview_url
				});
			}
		}

		models = [...models];
	}
	onMount(fetchCheckpoints);

	let models: Checkpoint[] = [];
	export let selected: string = '';
</script>

<Popup title="Checkpoint Selector" bind:open>
	<!-- Filters (other filters may come) -->
	<div class="grid grid-cols-[70%_auto] h-16 gap-2">
		<div>
			<p class="mb-1">Search</p>
			<Input placeholder="Search..." bind:value={searchPrompt} />
		</div>

		<div>
			<p class="mb-1">Base Model</p>
			<Combobox items={sdBaseTypes} />
		</div>
	</div>

	<!-- Model Grid -->
	<div
		class="grid grid-cols-6 gap-2 m-2 h-full overflow-y-auto overflow-x-hidden"
		style="height: calc(100% - 78px);"
	>
		{#each models as model, i}
			{#if searchPrompt == '' || model.name.toLowerCase().includes(searchPrompt.toLowerCase())}
				<button
					class="group hover:cursor-pointer h-96 border-none"
					on:click={() => {
						selected = model.name;
						open = false;
					}}
				>
					<div
						class="block rounded h-full w-full bg-center bg-cover bg-no-repeat"
						draggable={false}
						style="background-image: url('{model.preview_url}');"
					>
						<div
							class=" bg-background2 transition-all opacity-0 translate-y-0 group-hover:translate-y-8 group-hover:opacity-100"
						>
							<p class="static text-xl text-center">{model.name}</p>
						</div>
					</div>
				</button>
			{/if}
		{/each}
	</div>
</Popup>
