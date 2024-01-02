<script lang="ts">
	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

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
	export let handle: string;
	export let onDelete: () => void;

	let sdVersionProps = SDVersions[sdVersion as string];
</script>

<div class="block bg-background rounded-xl mb-2 h-24 w-full">
	<div
		class="float-left rounded-xl w-24 h-24 bg-cover mr-2"
		style="background-image: url({preview}); "
	></div>

	<div class="float-right mr-2 mt-2">
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
	</div>

	<div class="ml-24">
		<h1 class="text-2xl w-full mb-2">{name}</h1>

		<Separator class="mt-1 mb-1" />
		<div class="block mt-2">
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
						onConfirm: async () => {
							await fetch(`http://${SPARKUI_BACK_HOST}/v1/stable_diffusion/checkpoints/${handle}`, {
								method: 'DELETE'
							});
							if (onDelete) onDelete();
						}
					});
				}}><IconDelete /></Button
			>
		</div>
	</div>
</div>
