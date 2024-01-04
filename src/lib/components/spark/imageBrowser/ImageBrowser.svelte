<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	import Image from './Image.svelte';

	import { ArrowUp as IconDirectoryUp, ImageMinus } from 'lucide-svelte';

	import { TooltipButton } from '$spark/button';
	import { onMount } from 'svelte';
	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import { currentImage } from '$lib/stores';

	export let root: string;

	let currentPath = root.split('/');

	function directoryUp() {
		currentPath = currentPath.slice(0, -1);
	}
	function pathUpdated(e) {
		currentPath = e.target.value.split('/');
	}

	onMount(loadImages);

	const IMAGES_PER_LOAD = 50;
	async function loadImages() {
		const res = await fetch(
			`http://${SPARKUI_BACK_HOST}/v1/image?offset=${images.length}&limit=${IMAGES_PER_LOAD}`
		);
		console.log(res);
		const data = await res.json();

		for (let i of data.images) {
			images.push(`http://${SPARKUI_BACK_HOST}${i.url_full}`);
		}

		images = [...images];
		console.log(images);
	}

	let images: string[] = [];
</script>

<div class="w-full h-full">
	<div class="flex w-full justify-between mb-2">
		<Input value={currentPath.join('/')} on:change={pathUpdated} />
		<div class="ml-2 block">
			<TooltipButton variant="default" size="icon" tooltip="Move up" on:click={directoryUp}
				><IconDirectoryUp /></TooltipButton
			>
		</div>
	</div>
	<div class="block overflow-y-auto" style="height: calc(100vh - 120px);">
		<div class="grid grid-cols-8 gap-1">
			{#each images as img, i}
				<Image
					url={img}
					on:click={() => {
						$currentImage = img;
					}}
				/>
			{/each}
		</div>
	</div>
</div>
