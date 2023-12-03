<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';

	import { X as IconClose } from 'lucide-svelte';

	import Combobox from '$spark/Combobox.svelte';

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

{#if open}
	<!-- Blur the background -->
	<div
		class="absolute top-0 bottom-0 left-0 right-0 backdrop-blur z-10"
		role="none"
		on:click={() => {
			open = false;
		}}
	></div>
{/if}

<!-- The actual selector -->
<div
	class="absolute top-32 left-48 bottom-32 right-48 bg-background2 z-20 rounded-xl border transition-all duration-200 {open
		? 'scale-100 opacity-100'
		: 'scale-0 opacity-0'}"
>
	<!-- Header -->
	<div role="none" class="inline-block w-full pl-4 p-2">
		<h2 class="text-4xl font-bold float-left">{title}</h2>

		<Button
			size="icon"
			variant="ghost"
			class="float-right h-10 w-10"
			on:click={() => {
				open = false;
			}}><IconClose /></Button
		>
	</div>

	<!-- Main Content -->
	<div class="bg-background p-4 rounded-b-xl" style="height: calc(100% - 62px);">
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
						class="hover:cursor-pointer h-96 border-none"
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
							<div class="bg-background2 translate-y-[22.005rem]">
								<p class="static text-xl text-center opacity-100">{model.name}</p>
							</div>
						</div>
					</button>
				{/if}
			{/each}
		</div>
	</div>
</div>
