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

	let sldImageWidth = [width];
	let sldImageHeight = [height];

	const aspectRatios = [undefined, [1, 1], [3 / 2, 2 / 3], [16 / 9, 9 / 16]];

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

		height = ~~(width * ar[0]);
		updateSliders();
	}
	function onHeightUpdated() {
		let ar = aspectRatios[selectedAR];
		if (ar == undefined) return;

		width = ~~(height * ar[1]);
		updateSliders();
	}

	function swapDimensions() {
		let temp = width;
		width = height;
		height = temp;
		updateSliders();
	}
</script>

<div>
	<div class="grid grid-cols-[auto_auto] items-center">
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
				tooltip="3/2 Aspect Ratio"
				class="w-12"
				variant={selectedAR == 2 ? 'default' : 'outline'}>3/2</TooltipButton
			>
			<TooltipButton
				on:click={() => {
					updateAspectRatio(3);
				}}
				tooltip="16/9 Aspect Ratio"
				class="w-12"
				variant={selectedAR == 3 ? 'default' : 'outline'}>16/9</TooltipButton
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
			max={2048}
			min={64}
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
			max={2048}
			min={64}
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
</div>
