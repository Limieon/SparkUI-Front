<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { X as IconClose } from 'lucide-svelte';

	import { hotkey } from '@svelteuidev/composables';

	export let title: string;
	export let open: boolean = false;
	export let useHotkey: boolean = true;
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

	{#if useHotkey}
		<div
			use:hotkey={[
				[
					'escape',
					() => {
						open = false;
					}
				]
			]}
		></div>
	{/if}
{/if}

<div
	class="absolute top-32 left-48 bottom-32 right-48 bg-primary z-20 rounded-xl border transition-all duration-200 {open
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
		<slot />
	</div>
</div>
