<script lang="ts">
	import type { QueueItem } from '$lib/types/Queue';
	import Status from './Status.svelte';

	import hljs from 'highlight.js/lib/core';
	import json from 'highlight.js/lib/languages/json';
	hljs.registerLanguage('json', json);

	export let data: QueueItem;
	export let i: number;

	let open = false;
</script>

<button
	on:click={() => {
		open = !open;
	}}
	class="grid grid-cols-5 gap-2 hover:bg-background p-2 rounded-xl"
>
	<p class="text-right">{i}</p>
	<Status status={data.status} />
	<p>7.32s</p>
	<h1>{data.id}</h1>
	<p>{data.batchID}</p>
</button>

{#if open}
	<div class="bg-background rounded-xl p-4">
		<pre
			class="bg-background font-mono select-text cursor-text h-fit max-h-96 overflow-auto">{@html hljs.highlight(
				JSON.stringify(data, null, 4),
				{
					language: 'json'
				}
			).value}</pre>
	</div>
{/if}
