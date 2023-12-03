<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import { ArrowUp as IconDirectoryUp } from 'lucide-svelte';

	export let root: string;

	let currentPath = root.split('/');

	function directoryUp() {
		currentPath = currentPath.slice(0, -1);
	}
	function pathUpdated(e) {
		currentPath = e.target.value.split('/');
	}

	let images = [
		{
			url: 'https://picsum.photos/512/512'
		},
		{
			url: 'https://picsum.photos/768/512'
		},
		{
			url: 'https://picsum.photos/512/768'
		},
		{
			url: 'https://picsum.photos/768/768'
		}
	];
	export let selectedImage = images[0];
</script>

<div class="w-full h-full">
	<div class="flex w-full justify-between mb-2">
		<Input value={currentPath.join('/')} on:change={pathUpdated} />
		<div class="ml-2 block">
			<Button class="" variant="default" size="icon" on:click={directoryUp}
				><IconDirectoryUp /></Button
			>
		</div>
	</div>
	<div class="block overflow-y-scroll" style="height: calc(100vh - 120px);">
		<div class="grid grid-cols-8 gap-1">
			{#each images as img, i}
				<button
					class="w-full h-full"
					on:click={() => {
						selectedImage = img;
					}}
					><img
						class="block rounded bg-cover bg-center w-full aspect-square"
						src={img.url}
						style="background-image: url('{img.url}');"
						alt=""
					/>
				</button>
			{/each}
		</div>
	</div>
</div>
