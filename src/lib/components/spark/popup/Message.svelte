<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { X as IconClose } from 'lucide-svelte';

	import { hotkey } from '@svelteuidev/composables';

	export let title: string;
	export let open: boolean = false;

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

<div
	class="absolute z-40 rounded-xl border transition-all duration-200 bg-primary w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {open
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
	<div class="bg-background rounded-b-xl" style="height: calc(100% - 62px);">
		<div class="p-4">
			<slot />
		</div>

		<Separator class="w-full" />
		<div class="flex items-center justify-end p-2">
			<!-- Footer Content -->
			<Button class="mr-2" on:click={confirm}>Confirm</Button>
			<Button variant="destructive" on:click={close}>Cancel</Button>
		</div>
	</div>
</div>
