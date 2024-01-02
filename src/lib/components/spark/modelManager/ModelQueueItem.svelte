<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';

	export let name: string;
	export let handle: string;
	export let preview_url: string;
	export let current: number;
	export let size: number;
</script>

<div class="block bg-background rounded-xl mb-2 h-32">
	<div
		class="float-left rounded-xl w-32 h-32 bg-cover mr-2"
		style="background-image: url({preview_url}); "
	></div>

	<div class="ml-32 p-2">
		<h2 class="text-2xl mb-1">{name}</h2>
		{#if size > 0}
			<p class="float-left">{(current / 1000000).toFixed(2)}MB</p>
			<p class="float-right mr-1">{(size / 1000000).toFixed(2)}MB</p>
			<Progress class="" value={current} max={size} />
		{/if}
	</div>
</div>
