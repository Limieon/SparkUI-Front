<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import Combobox from '$spark/Combobox.svelte';
	import { Popup } from '$spark/popup';

	export let open: boolean = true;
	export let title: string;

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

	// Arbitrary Data for testing the frontend
	const models = [
		{
			name: 'RealCartoon3D',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/5fe07a49-bd79-4e6f-b3ba-b6b1c521ec68/width=450/RealCartoon3DV11.jpeg'
		},
		{
			name: 'DreamShaperV8',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/dd9b038c-bd15-43ab-86ab-66e145ad7ff2/width=450/26072158-132340247-8k%20portrait%20of%20beautiful%20cyborg%20with%20brown%20hair,%20intricate,%20elegant,%20highly%20detailed,%20majestic,%20digital%20photography,%20art%20by%20artg_ed.jpeg'
		},
		{
			name: 'AlbedoBase XL',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/68df5736-dd1f-4df4-8e7d-5fbd7adf8730/width=450/0.jpeg'
		},
		{
			name: 'AingDiffusion - V12',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/669c8aef-b211-42c4-b603-5c6d7a26e959/width=450/05337-3445846027.jpeg'
		},
		{
			name: 'RealCartoon-Anime - V7',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/d6592dc4-969a-4b54-bec8-51e408329d94/width=450/RealCartoonAnimeV7.jpeg'
		}
	];

	export let selected: string = models[0].name;
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
						style="background-image: url('{model.preview}');"
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
