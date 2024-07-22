<script lang="ts">
	import { Button } from '$ui/button';

	import IconX from 'lucide-svelte/icons/x';

	export let title: string;

	export let open: boolean = false;

	export let customFooter: boolean = false;
	export let customHeader: boolean = false;

	export let apply = 'Apply';
	export let close = 'Close';
	export let cancel = 'Cancel';

	export let onApply: (() => void) | undefined = undefined;
	export let onClose: (() => void) | undefined = undefined;
	export let onCancel: (() => void) | undefined = undefined;
</script>

<div
	class="absolute bottom-0 left-0 right-0 top-0 z-40 bg-black transition-all {open
		? 'pointer-events-auto bg-opacity-50 backdrop-blur-lg backdrop-filter '
		: 'pointer-events-none bg-opacity-0'}"
	on:click={onClose}
/>

<div
	class="bg-base-300 fixed bottom-48 left-96 right-96 top-48 z-50 flex flex-col rounded-xl backdrop:blur-xl {open
		? 'pointer-events-auto translate-y-0 opacity-100'
		: 'pointer-events-none -translate-y-36 opacity-0'} transition-all"
>
	<!-- Header -->
	<div class="left-0 right-0 h-fit rounded-t-xl bg-primary p-2">
		{#if customHeader}
			<slot name="header" />
		{:else}
			<Button class="float-right h-12 w-12 p-0 hover:bg-red-700" variant="ghost" on:click={onClose}
				><IconX /></Button
			>

			<h1>{title}</h1>
		{/if}
	</div>

	<!-- Content -->
	<div class="mb-16 flex-1 overflow-hidden p-2">
		<slot />
	</div>

	<!-- Footr -->
	<hr class="absolute bottom-16 w-full" />
	<div class="absolute bottom-2 right-2 w-fit">
		{#if customFooter}
			<slot name="footer" />
		{:else}
			<div class="grid grid-flow-col gap-2">
				{#if onClose != undefined}
					<button class="btn btn-primary w-32" on:click={onClose}>{close}</button>
				{/if}
				{#if onCancel != undefined}
					<button class="btn btn-ghost border-neutral-content w-32 border-2" on:click={onCancel}
						>{cancel}</button
					>
				{/if}
				{#if onApply != undefined}
					<button class="btn btn-ghost border-neutral-content w-32 border-2" on:click={onApply}
						>{apply}</button
					>
				{/if}
			</div>
		{/if}
	</div>
</div>
