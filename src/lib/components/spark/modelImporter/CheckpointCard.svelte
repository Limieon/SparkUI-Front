<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';

	export let name: string;
	export let description: string;
	export let preview: string;
	export let sdVersion: string;

	export let onSelect: () => void;

	export let selected = false;
</script>

<button
	class="group hover:cursor-pointer h-96 {selected ? 'border-primary border-2 rounded' : ''}"
	on:click={() => {
		onSelect();
		selected = !selected;
	}}
>
	<div
		class="block h-full w-full bg-center bg-cover bg-no-repeat"
		draggable={false}
		style="background-image: url('{preview}');"
	>
		<div
			class=" bg-background2 transition-all opacity-0 translate-y-0 group-hover:translate-y-8 group-hover:opacity-100"
		>
			<p class="static text-xl text-center">{name}</p>
		</div>
	</div>
</button>
