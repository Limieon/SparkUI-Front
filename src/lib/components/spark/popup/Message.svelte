<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { X as IconClose } from 'lucide-svelte';

	import { hotkey } from '@svelteuidev/composables';

	import { currentPopup as data } from '$lib/stores';

	function close() {
		$data.open = false;
		if ($data.onClose) $data.onClose();
	}
	function confirm() {
		close();
		if ($data.onConfirm) $data.onConfirm();
	}
</script>

{#if $data.open}
	<div
		class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-70 z-40"
		role="none"
		on:click={close}
	></div>

	<div
		use:hotkey={[
			[
				'escape',
				() => {
					$data.open = false;
				}
			],
			[
				'Enter',
				() => {
					confirm();
				}
			]
		]}
	></div>
{/if}

<div
	class="absolute z-50 rounded-xl border transition-all duration-200 bg-primary w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {$data.open
		? 'scale-100 opacity-100'
		: 'scale-0 opacity-0'}"
>
	<!-- Header -->
	<div role="none" class="inline-block w-full pl-4 p-2">
		<h2 class="text-4xl font-bold float-left">{$data.title}</h2>

		<Button size="icon" variant="ghost" class="float-right h-10 w-10" on:click={close}
			><IconClose /></Button
		>
	</div>

	<!-- Main Content -->
	<div class="bg-background rounded-b-xl" style="height: calc(100% - 62px);">
		<div class="p-4">
			<p>{$data.message}</p>
		</div>

		<Separator class="w-full" />
		<div class="flex items-center justify-end p-2">
			<!-- Footer Content -->
			<Button class="mr-2" on:click={confirm}>Confirm</Button>
			<Button variant="destructive" on:click={close}>Cancel</Button>
		</div>
	</div>
</div>
