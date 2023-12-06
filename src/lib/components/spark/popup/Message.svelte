<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { X as IconClose } from 'lucide-svelte';

	import { hotkey } from '@svelteuidev/composables';

	export let title: string;
	export let open: boolean = false;

	export let useConfirmHotkey: boolean = false;
	export let useCloseHotkey: boolean = false;

	export let onConfirm: (() => void) | undefined = undefined;
	export let onClose: (() => void) | undefined = undefined;

	function close() {
		open = false;
		if (onClose) onClose();
	}
	function confirm() {
		close();
		if (onConfirm) onConfirm();
	}
</script>

{#if open}
	<!-- Darken the background -->
	<div
		class="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-70"
		role="none"
		on:click={close}
	></div>

	{#if useConfirmHotkey}
		<div use:hotkey={[['enter', confirm]]}></div>
	{/if}
	{#if useCloseHotkey}
		<div use:hotkey={[['escape', close]]}></div>
	{/if}
{/if}

<div
	class="absolute m-[0_auto] z-20 rounded-xl border transition-all duration-200 bg-primary {open
		? 'scale-100 opacity-100'
		: 'scale-0 opacity-0'}"
>
	<!-- Header -->
	<div role="none" class="inline-block w-full pl-4 p-2">
		<h2 class="text-4xl font-bold float-left">{title}</h2>

		<Button size="icon" variant="ghost" class="float-right h-10 w-10" on:click={close}
			><IconClose /></Button
		>
	</div>

	<!-- Main Content -->
	<div class="bg-background p-4 rounded-b-xl" style="height: calc(100% - 62px);">
		<slot />
	</div>

	<!-- Footer Content -->
</div>
