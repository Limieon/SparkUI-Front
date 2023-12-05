<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	import Combobox from '$spark/Combobox.svelte';
	import { TooltipButton } from '$spark/button';

	import { ArrowDownUp as IconSwap } from 'lucide-svelte';

	let selectedAR = 0;

	export let width: number;
	export let height: number;

	let MAX_WIDTH = 2048;
	let MAX_HEIGHT = 2048;
	let MIN_WIDTH = 64;
	let MIN_HEIGHT = 64;

	let sldImageWidth = [width];
	let sldImageHeight = [height];

	let swapped = false;
	const aspectRatios = [undefined, [1, 1], [3 / 2, 2 / 3], [16 / 9, 9 / 16]];

	const predefinedSizes: (number[] | undefined)[] = [
		undefined,
		[512, 512],
		[512, 768],
		[768, 512],
		[768, 768]
	];

	function updateAspectRatio(id: number) {
		selectedAR = id;
		onWidthUpdated();
	}

	function updateSliders() {
		sldImageHeight[0] = height;
		sldImageWidth[0] = width;
	}

	function onWidthUpdated() {
		let ar = aspectRatios[selectedAR];
		if (ar == undefined) return;

		height = Math.min(Math.max(~~(width * ar[swapped ? 0 : 1]), MIN_HEIGHT), MAX_HEIGHT);
		updateSliders();
	}
	function onHeightUpdated() {
		let ar = aspectRatios[selectedAR];
		if (ar == undefined) return;

		width = Math.min(Math.max(~~(height * ar[swapped ? 1 : 0]), MIN_WIDTH), MAX_WIDTH);
		updateSliders();
	}

	function swapDimensions() {
		swapped = !swapped;

		let temp = width;
		width = height;
		height = temp;
		updateSliders();
	}

	let predefinedSize = 1;
	function usePredefinedSize(id: number) {
		predefinedSize = id;

		if (predefinedSizes[id] == undefined) return;
		width = predefinedSizes[id][0];
		height = predefinedSizes[id][1];
	}
</script>

<div>
	<div class="grid grid-cols-[auto_auto] items-center">
		<p class="float-left">Image Size:</p>
		<div class="margin-[0_auto]">
			{#each predefinedSizes as size, i}
				{#if size == undefined}
					<TooltipButton
						on:click={() => {
							usePredefinedSize(0);
						}}
						tooltip="Custom Image Size"
						class="w-20"
						variant={predefinedSize == 0 ? 'default' : 'outline'}>Custom</TooltipButton
					>
				{:else}
					<TooltipButton
						on:click={() => {
							usePredefinedSize(i);
						}}
						tooltip="{size[0]} x {size[1]} Image Size"
						class="w-20"
						variant={predefinedSize == i ? 'default' : 'outline'}
						>{size[0]} x {size[1]}</TooltipButton
					>
				{/if}
			{/each}
		</div>
	</div>

	{#if predefinedSize == 0}
		<div class="grid grid-cols-[auto_auto] items-center mt-2">
			<p class="float-left">Aspect Ratio</p>
			<div class="margin-[0_auto]">
				<TooltipButton
					on:click={() => {
						updateAspectRatio(0);
					}}
					tooltip="Free Aspect Ratio"
					class="w-12"
					variant={selectedAR == 0 ? 'default' : 'outline'}>Free</TooltipButton
				>
				<TooltipButton
					on:click={() => {
						updateAspectRatio(1);
					}}
					tooltip="1/1 Aspect Ratio"
					class="w-12"
					variant={selectedAR == 1 ? 'default' : 'outline'}>1/1</TooltipButton
				>
				<TooltipButton
					on:click={() => {
						updateAspectRatio(2);
					}}
					tooltip="{swapped ? '9/16' : '16/9'} Aspect Ratio"
					class="w-12"
					variant={selectedAR == 2 ? 'default' : 'outline'}
					>{`${swapped ? '2/3' : '3/2'}`}</TooltipButton
				>
				<TooltipButton
					on:click={() => {
						updateAspectRatio(3);
					}}
					tooltip="{swapped ? '9/16' : '16/9'} Aspect Ratio"
					class="w-12"
					variant={selectedAR == 3 ? 'default' : 'outline'}
					>{`${swapped ? '9/16' : '16/9'}`}</TooltipButton
				>
				<TooltipButton
					on:click={swapDimensions}
					tooltip="Swap Dimensions"
					class="float-right w-12"
					variant="default"><IconSwap /></TooltipButton
				>
			</div>
		</div>

		<div class="w-full grid grid-cols-[10%_auto_5%_40%] gap-2 items-center mt-2">
			<p class="ml-2">Width</p>
			<Slider
				class="mr-2"
				style="transform: translateX(16px);"
				max={MAX_WIDTH}
				min={MIN_WIDTH}
				bind:value={sldImageWidth}
				onValueChange={(v) => {
					width = v[0];
					onWidthUpdated();
				}}
			/>
			<div></div>
			<Input
				bind:value={width}
				on:change={(e) => {
					sldImageWidth = [e.target.value];
					onWidthUpdated();
				}}
				step={64}
				num
			/>
		</div>
		<div class="w-full grid grid-cols-[10%_auto_5%_40%] gap-2 items-center mt-2">
			<p class="ml-2">Height</p>
			<Slider
				class="mr-2"
				style="transform: translateX(16px);"
				max={MAX_HEIGHT}
				min={MIN_HEIGHT}
				bind:value={sldImageHeight}
				onValueChange={(v) => {
					height = v[0];
					onHeightUpdated();
				}}
			/>
			<div></div>
			<Input
				bind:value={height}
				on:change={(e) => {
					sldImageHeight = [e.target.value];
					onHeightUpdated();
				}}
				step={64}
				num
			/>
		</div>
	{/if}
</div>
