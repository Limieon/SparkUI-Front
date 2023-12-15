<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Badge } from '$lib/components/ui/badge';

	import { Trash2 as IconDelete } from 'lucide-svelte';

	import { MessageBox } from '$lib/stores';
	import { SDVersions, type SDVersionIDs } from '$lib/types/StableDiffusion';

	export let name: string;
	export let description: string;
	export let preview: string;
	export let modelPage: string;
	export let sdVersion: SDVersionIDs;

	let sdVersionProps = SDVersions[sdVersion as string];
</script>

<div class="bg-background p-2 mb-2 rounded-lg">
	<div class="block">
		<div class="float-right">
			{#if sdVersionProps.color === 'rose'}
				<Badge class="bg-rose-600 hover:bg-rose-800">{sdVersionProps.name}</Badge>
			{:else if sdVersionProps.color === 'sky'}
				<Badge class="bg-sky-600 hover:bg-sky-800">{sdVersionProps.name}</Badge>
			{:else if sdVersionProps.color === 'teal'}
				<Badge class="bg-teal-600 hover:bg-teal-800">{sdVersionProps.name}</Badge>
			{:else if sdVersionProps.color === 'fuchsia'}
				<Badge class="bg-fuchsia-600 hover:bg-fuchsia-800">{sdVersionProps.name}</Badge>
			{/if}
		</div>

		<h1 class="text-2xl w-min">{name}</h1>
	</div>

	<Separator class="mt-1 mb-1" />

	<p>{description}</p>
	<div class="mt-2">
		<Button
			class="w-10 h-10"
			size="icon"
			variant="destructive"
			on:click={() => {
				$MessageBox.open({
					title: `Delete ${name}?`,
					message: [
						`You really wanna delete '${name}'?`,
						'This also removes the associated checkpoint file!'
					],
					onConfirm: () => {
						console.log(`Deleting ${name}...`);
					}
				});
			}}><IconDelete /></Button
		>
	</div>
</div>
