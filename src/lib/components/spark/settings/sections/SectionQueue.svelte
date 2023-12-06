<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';

	import { TooltipButton, ButtonGroup, SingleSelectionButtonGroup } from '$spark/button';

	import Combobox from '$spark/Combobox.svelte';

	import {
		Pause as IconPause,
		Play as IconPlay,
		Moon as IconHibernate,
		Trash2 as IconClear,
		HardDriveUpload as IconRestore
	} from 'lucide-svelte';

	const queuePriorities = [
		{
			name: 'Standard',
			tooltip: 'Does not alter queue order'
		},
		{
			name: 'Checkpoint',
			tooltip: 'Sorts queue by used checkpoint'
		},
		{
			name: 'Batch Count',
			tooltip: 'Sorts queue by batch count'
		}
	];

	export let queuePaused = false;
	export let queueHibernated = false;

	export let queueSorting = 0;
</script>

<h2 class="text-xl mb-1">Queue Sorting:</h2>
<SingleSelectionButtonGroup bind:selected={queueSorting} items={queuePriorities} />

<h2 class="text-xl mt-3 mb-1">Queue Operations:</h2>
<div class="w-fit">
	<TooltipButton
		disabled={!queuePaused}
		tooltip="Continue"
		size="icon"
		on:click={() => {
			queuePaused = false;
		}}><IconPlay /></TooltipButton
	>
	<TooltipButton
		disabled={queuePaused}
		tooltip="Pause"
		size="icon"
		on:click={() => {
			queuePaused = true;
		}}><IconPause /></TooltipButton
	>

	<TooltipButton
		class="ml-2"
		tooltip={queueHibernated ? 'Retore queue from hibernation' : 'Hibernate queue'}
		size="icon"
		on:click={() => {
			queueHibernated = !queueHibernated;
		}}
	>
		{#if queueHibernated}
			<IconRestore />
		{:else}
			<IconHibernate />
		{/if}
	</TooltipButton>
	<TooltipButton tooltip="Pause" size="icon" variant="destructive"><IconClear /></TooltipButton>
</div>
