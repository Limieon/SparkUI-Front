<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Button } from '$ui/button';
	import IconX from 'lucide-svelte/icons/x';
	import { createEventDispatcher } from 'svelte';

	export let open: boolean = false;

	export let title: string = 'Popup';
	export let size: 'sm' | 'lg' | 'xl' | '2xl' = 'lg';

	const dispatch = createEventDispatcher();

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) close();
	}

	function close() {
		open = false;
	}

	function handleApply() {
		dispatch('apply');
		close();
	}

	function handleOK() {
		dispatch('ok');
		close();
	}

	function handleClose() {
		dispatch('close');
		close();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		on:click={handleOverlayClick}
	>
		<div
			class="relative {size == 'sm'
				? 'h-2/5 w-2/5'
				: size == 'lg'
					? 'h-3/5 w-3/5'
					: size === 'xl'
						? 'h-4/6 w-4/6'
						: 'h-5/6 w-5/6'} overflow-hidden rounded-lg bg-background2 shadow-lg transition-transform duration-300"
			transition:fly={{ y: 50, duration: 300 }}
		>
			<div class="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 shadow-sm">
				<h2 class="text-3xl font-bold">{title}</h2>
				<Button
					variant="ghost"
					class="h-12 w-12 bg-primary p-0 hover:bg-destructive"
					on:click={handleClose}><IconX size={24} /></Button
				>
			</div>

			<div class="overflow-y-auto pb-2 pl-4 pr-4 pt-2" style="height: calc(100% - 8rem)">
				<slot />
			</div>

			<div class="sticky bottom-0 z-10 flex justify-end space-x-2 bg-background p-2">
				<Button variant="ghost" class="w-24" on:click={handleApply}>Apply</Button>
				<Button variant="ghost" class="w-24" on:click={handleOK}>OK</Button>
				<Button variant="ghost" class="w-24" on:click={handleClose}>Close</Button>
			</div>
		</div>
	</div>
{/if}
