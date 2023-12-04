<script lang="ts">
	import { Slider } from '$lib/components/ui/slider';
	import { Input } from '$lib/components/ui/input';

	import Combobox from '$spark/Combobox.svelte';

	export let width: number;
	export let height: number;

	let sldImageWidth = [width];
	let sldImageHeight = [height];
</script>

<div>
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
			}}
		/>
		<div></div>
		<Input
			bind:value={width}
			on:change={(e) => {
				sldImageWidth = [e.target.value];
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
			}}
		/>
		<div></div>
		<Input
			bind:value={height}
			on:change={(e) => {
				sldImageHeight = [e.target.value];
			}}
			step={64}
			num
		/>
	</div>
</div>
