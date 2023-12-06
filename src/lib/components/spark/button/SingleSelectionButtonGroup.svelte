<script lang="ts">
	export let items: { name: string; tooltip?: string }[] = [];
	import ButtonGroup from './ButtonGroup.svelte';

	import { Button } from '$lib/components/ui/button';
	import TooltipButton from './TooltipButton.svelte';

	let className = '';
	export { className as class };

	function onClick(i: number) {
		selected = i;
	}
	export let selected: number = 0;
</script>

<ButtonGroup>
	{#each items as item, i}
		{#if item.tooltip}
			<TooltipButton
				class="w-full"
				variant={selected === i ? 'default' : 'outline'}
				tooltip={item.tooltip}
				on:click={() => onClick(i)}>{item.name}</TooltipButton
			>
		{:else}
			<Button
				class="w-full"
				variant={selected === i ? 'default' : 'outline'}
				on:click={() => onClick(i)}>{item.name}</Button
			>
		{/if}
	{/each}
</ButtonGroup>
