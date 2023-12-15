<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import { Trash2 as IconDelete } from 'lucide-svelte';

	import { MessageBox } from '$lib/stores';

	export let name: string;
	export let description: string;
	export let preview: string;
	export let modelPage: string;
</script>

<div class="bg-background p-2 mb-2 rounded-lg">
	<h1 class="text-2xl">{name}</h1>
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
