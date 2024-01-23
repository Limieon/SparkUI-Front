<script lang="ts">
	import { onMount } from 'svelte';
	import { workflow } from '$lib/stores';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import { Node, type NodeMeta } from '$spark/nodes';

	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		SvelteFlowProvider,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		NodeToolbar
	} from '@xyflow/svelte';

	// 👇 this is important! You need to import the styles for Svelte Flow to work
	import '@xyflow/svelte/dist/style.css';
	import { PanelTopClose } from 'lucide-svelte';

	import * as Command from '$lib/components/ui/command';
	import { hotkey } from '@svelteuidev/composables';

	export let selectorOpen = false;

	const nodeTypes = {
		node: Node
	};

	const nodes = writable<any[]>($workflow.nodes);
	const edges = writable<any[]>($workflow.edges);
	let availableNodes: NodeMeta[] = [];

	const NODE_ORIGIN = { x: 0, y: 0 };
	onMount(async () => {
		const data = await fetch(`http://${SPARKUI_BACK_HOST}/v1/nodes`);
		const json = await data.json();
		availableNodes = json.nodes;

		$nodes = [...$workflow.nodes];
		$edges = [...$workflow.edges];
	});

	$: {
		$workflow.nodes = [...$nodes];
		$workflow.edges = [...$edges];
	}

	function addNode(nodeID: number) {
		const temp = [...$nodes];
		const node = availableNodes[nodeID];

		temp.push({
			id: `${temp.length + 1}`,
			type: 'node',
			data: {
				label: node.label,
				connections: {
					inputs: node.inputs,
					outputs: node.outputs
				}
			},
			position: NODE_ORIGIN
		});

		$nodes = [...temp];
	}

	const snapGrid: [number, number] = [5, 5];
</script>

<div>
	<div style:height="calc(100vh - 80px)">
		<SvelteFlowProvider>
			<SvelteFlow
				class=""
				{nodes}
				{edges}
				{snapGrid}
				{nodeTypes}
				fitView
				on:nodeclick={(event) => console.log('on node click', event.detail.node)}
			>
				<MiniMap nodeColor="hsl(var(--primary))" position="top-right" />
				<Background
					patternColor="hsl(var(--foreground))"
					bgColor="hsl(var(--background-2))"
					variant={BackgroundVariant.Cross}
				/>
			</SvelteFlow>
		</SvelteFlowProvider>
	</div>

	<div
		use:hotkey={[
			[
				'mod+space',
				() => {
					selectorOpen = !selectorOpen;
				}
			]
		]}
	/>

	<Command.Dialog bind:open={selectorOpen}>
		<Command.Input placeholder="Select a Node to add..." />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>

			<Command.Group heading="Nodes">
				{#each availableNodes as node, i}
					<Command.Item
						onSelect={() => {
							addNode(i);
							selectorOpen = false;
						}}>{node.label}</Command.Item
					>
				{/each}
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
