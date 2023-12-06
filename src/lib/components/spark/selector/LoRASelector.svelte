<script lang="ts">
	import { Input } from '$lib/components/ui/input';

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

	// Arbitrary Data for testing the frontend
	const loras = [
		{
			name: 'Double Exposure',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/dccb96fb-d0a2-4a52-b7ba-240e399e41f2/width=450/2023-11-03_10-09-28_6403.jpeg'
		},
		{
			name: 'Thunder magic - Grimoire',
			preview:
				'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/fadf0131-4855-4d8c-9aae-79ce8328e670/width=450/0.jpeg'
		}
	];

	export let selected: string = loras[0].name;

	export let ignore: string[] = [];

	export let onChange: (name: string) => void = () => {};
</script>

<!-- The actual selector -->
<Popup title="LoRA Selector" bind:open>
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
		{#each loras as model, i}
			{#if (searchPrompt == '' || model.name
					.toLowerCase()
					.includes(searchPrompt.toLowerCase())) && !ignore.includes(model.name)}
				<button
					class="group hover:cursor-pointer border-none aspect-square h-full"
					on:click={() => {
						selected = model.name;
						open = false;
						onChange(model.name);
					}}
				>
					<div
						class="block rounded h-full w-full bg-center bg-cover bg-no-repeat"
						draggable={false}
						style="background-image: url('{model.preview}');"
					>
						<div class="group transition-opacity">
							<div
								class="bg-background2 transition-all opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0"
							>
								<p class="static text-center">{model.name}</p>
							</div>
						</div>
					</div>
				</button>
			{/if}
		{/each}
	</div>
</Popup>
