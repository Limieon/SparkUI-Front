<script lang="ts">
	import { fly } from 'svelte/transition';

	import { Button } from '$ui/button';

	import IconX from 'lucide-svelte/icons/x';

	export let open = false;

	function handleOverlayClick(e) {
		if (e.target === e.currentTarget) close();
	}
	function close() {
		open = false;
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		on:click={handleOverlayClick}
	>
		<div
			class="relative h-4/5 w-4/5 overflow-hidden rounded-lg bg-background2 shadow-lg transition-transform duration-300"
			transition:fly={{ y: 50, duration: 300 }}
		>
			<div class="sticky top-0 z-10 flex items-center justify-between bg-primary p-4 shadow-sm">
				<h2 class="text-2xl">Settings</h2>
				<Button
					variant="ghost"
					class="h-12 w-12 bg-primary p-0 hover:bg-destructive"
					on:click={close}><IconX size={24} /></Button
				>
			</div>

			<div class="overflow-y-auto pb-2 pl-4 pr-4 pt-2" style="height: calc(100% - 8rem)">
				{#each { length: 200 } as _}
					<p class="mb-2">Setting 1</p>
				{/each}
			</div>

			<div class="sticky bottom-0 z-10 flex justify-end space-x-2 bg-background p-2">
				<Button variant="ghost" class="w-24" on:click={close}>Apply</Button>
				<Button variant="ghost" class="w-24" on:click={close}>OK</Button>
				<Button variant="ghost" class="w-24" on:click={close}>Close</Button>
			</div>
		</div>
	</div>
{/if}
