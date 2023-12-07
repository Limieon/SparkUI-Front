<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';

	import { TooltipButton, ButtonGroup, SingleSelectionButtonGroup } from '$spark/button';

	import { settingsData as data, MessageBox } from '$lib/stores';

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

	function openClearQueueMessage() {
		$MessageBox.open({
			title: 'Clear Queue',
			message: 'Do you really want to clear the queue?',
			onConfirm: clearQueue
		});
	}

	function start() {
		$data.queuePaused = false;
	}
	function pause() {
		$data.queuePaused = true;
	}
	function toggleHibernation() {
		$data.queueHibernated = !$data.queueHibernated;

		if ($data.queueHibernated) $data.queuePaused = true;
	}

	function clearQueue() {}
</script>

<h2 class="text-xl mb-1">Queue Sorting:</h2>
<SingleSelectionButtonGroup bind:selected={$data.queueSorting} items={queuePriorities} />

<h2 class="text-xl mt-3 mb-1">
	Queue Operations:
	{#if $data.queueHibernated}
		(<span class="text-amber-400">Queue is hibernated!</span>)
	{:else if $data.queuePaused}
		(<span class="text-amber-400">Queue is paused!</span>)
	{/if}
</h2>

<div class="w-fit">
	<TooltipButton
		disabled={!$data.queuePaused || $data.queueHibernated}
		tooltip="Continue"
		size="icon"
		on:click={start}><IconPlay /></TooltipButton
	>
	<TooltipButton
		disabled={$data.queuePaused || $data.queueHibernated}
		tooltip="Pause"
		size="icon"
		on:click={pause}><IconPause /></TooltipButton
	>

	<TooltipButton
		class="ml-2"
		tooltip={$data.queueHibernated ? 'Retore queue from hibernation' : 'Hibernate queue'}
		size="icon"
		on:click={toggleHibernation}
	>
		{#if $data.queueHibernated}
			<IconRestore />
		{:else}
			<IconHibernate />
		{/if}
	</TooltipButton>
	<TooltipButton
		tooltip="Clear Queue"
		size="icon"
		variant="destructive"
		on:click={openClearQueueMessage}><IconClear /></TooltipButton
	>
</div>
