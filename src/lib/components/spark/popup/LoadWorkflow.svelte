<script lang="ts">
	import Popup from './Popup.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Background } from '@xyflow/svelte';
	import { Separator } from '$lib/components/ui/separator';

	import { ImageIcon } from 'lucide-svelte';

	export let open: boolean;

	export let title: string = 'Save Workflow...';
	export let name: string;
	export let description: string;
	export let nodeCount: number = 0;
	export let connectionCount: number = 0;
	export let usageCount: number = 0;
	export let createdAt: number = Date.now();
	export let lastUpdatedAt: number = Date.now();

	function formatTimestamp(stamp: number) {
		let date = new Date(stamp);
		return (
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getDate() +
			' ' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds()
		);
	}

	interface Tag {
		name: string;
		color: string;
	}

	let tags: Tag[] = [
		{
			name: 'Anime',
			color: '5352ed'
		},
		{
			name: 'Realistic',
			color: 'ff4757'
		}
	];

	function save() {}
	function close() {}

	let image: string = '';
</script>

<Popup {title} bind:open class="top-32 left-[28rem] bottom-32 right-[28rem] bg-primary">
	<div class="grid grid-cols-[20rem_auto] h-[20rem] gap-2">
		<div class="h-[20rem]">
			<input
				type="file"
				id="preview"
				on:change={(e) => {
					let file = e.target.files[0];
					image = URL.createObjectURL(file);
				}}
				hidden
			/>
			<label
				for="preview"
				class="border-white rounded-lg bg-background2 block bg-cover bg-center h-80 w-80 hover:cursor-pointer"
				style="background-image: url({image})"
			>
				{#if !image}
					<div class="flex w-full h-full">
						<ImageIcon class="self-center m-[0_auto]" size={96} />
					</div>
				{/if}
			</label>
		</div>
		<div class="h-[20rem]">
			<Input placeholder="Workflow Name" bind:value={name} class="mb-2" />
			<Textarea
				placeholder="Workflow Description"
				bind:value={description}
				class="h-[15rem] mb-2 resize-none"
			/>
			<div class="block w-full h-8">
				{#each tags as tag}
					<span class="rounded-xl float-left mr-1 pl-2 pr-2 bg-background2">
						<span
							class="self-center mt-1 mr-2 w-4 h-4 rounded-xl float-left"
							style="background-color: #{tag.color};"
						></span>
						<p class="float-left">{tag.name}</p></span
					>
				{/each}

				<button class="rounded-xl float-left bg-background2 w-6 h-6 text-center text-sm">+</button>
			</div>
		</div>
	</div>

	<Separator class="w-full mt-8 mb-8" />
	<h2 class="text-xl mb-2">Workflow Summary:</h2>
	<div class="p-2 rounded-xl bg-background2 select-text hover:cursor-text">
		<ul class="list-disc ml-6 font-mono">
			<li>Nodes: <span class="text-accent">{nodeCount}</span></li>
			<li>Connections: <span class="text-accent">{connectionCount}</span></li>
			<li>Usage Count: <span class="text-accent">{usageCount}</span></li>
			<li>Created At: <span class="text-accent">{formatTimestamp(createdAt)}</span></li>
			<li>Last Updated At: <span class="text-accent">{formatTimestamp(lastUpdatedAt)}</span></li>
		</ul>
	</div>

	<div class="absolute left-0 bottom-0 right-0">
		<Separator class="w-full" />
		<div class="flex p-2">
			<Button class="mr-2" on:click={save}>Save</Button>
			<Button variant="destructive" on:click={close}>Close</Button>
		</div>
	</div>
</Popup>
