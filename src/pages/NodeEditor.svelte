<script lang="ts">
	import { onMount } from 'svelte';
	import { workflow } from '$lib/stores';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import Socket from '$spark/Socket.svelte';

	import { DefaultNode, type NodeMeta } from '$spark/nodes';

	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		SvelteFlowProvider,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		NodeToolbar,
		type IsValidConnection
	} from '@xyflow/svelte';

	// 👇 this is important! You need to import the styles for Svelte Flow to work
	import '@xyflow/svelte/dist/style.css';
	import { PanelTopClose } from 'lucide-svelte';

	import * as Command from '$lib/components/ui/command';
	import { hotkey } from '@svelteuidev/composables';

	export let selectorOpen = false;

	const nodeTypes = {
		api_node: DefaultNode
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

		console.log({ nodes: $workflow.nodes, edges: $workflow.edges });
	}

	$: {
		console.log($workflow.parameters);
	}

	function addNode(nodeID: number) {
		const temp = [...$nodes];
		const node = availableNodes[nodeID];

		temp.push({
			id: `${temp.length + 1}`,
			type: 'api_node',
			data: {
				nodeID: `${temp.length + 1}`,
				id: node.id,
				label: node.label,
				inputs: node.inputs,
				outputs: node.outputs,
				fields: node.fields,
				current: writable<boolean>(false),
				useProgress: node.use_progress,
				progressCurrent: writable<number>(0),
				progressMax: writable<number>(1),
				values: writable({})
			},
			position: NODE_ORIGIN,
			dragHandle: '.dragHandle'
		});

		$nodes = [...temp];
	}

	const snapGrid: [number, number] = [5, 5];

	const isValidConnection: IsValidConnection = (connection) => {
		try {
			if (!$nodes) return true;

			const tgt = $nodes[(connection.target as unknown as number) - 1];
			const src = $nodes[(connection.source as unknown as number) - 1];

			const to = tgt.data.inputs[(connection.targetHandle as unknown as number) - 1];
			const from =
				src.data.outputs[
					(connection.sourceHandle as unknown as number) - src.data.inputs.length - 1
				];

			return from.type === to.type;
		} catch (e) {
			return false;
		}
	};

	function handleProgress(data: { node: string; current: number; max: number }) {
		console.log(`Node Data:`, data);

		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(true);
				n.data.progressCurrent.set(data.current);
				n.data.progressMax.set(data.max);
				$nodes = $nodes;
			}
		});
	}
	function handleActivation(data: { node: string }) {
		console.log(`Node Data:`, data);
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(true);
				$nodes = $nodes;
			}
		});
	}
	function handleDeactivation(data: { node: string }) {
		console.log(`Node Data:`, data);
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(false);
				$nodes = $nodes;
			}
		});
	}
</script>

<div>
	<div>
		<button
			on:click={async () => {
				await fetch(`http://${SPARKUI_BACK_HOST}/v1/queue/prompt`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify($workflow)
				});
			}}>Lol</button
		>
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

<div style:height="calc(100vh - 100px)">
	<SvelteFlow
		class=""
		{nodes}
		{edges}
		{snapGrid}
		{nodeTypes}
		{isValidConnection}
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
</div>

<Socket on:node_progress={(e) => handleProgress(e.detail)} />
<Socket on:node_activation={(e) => handleActivation(e.detail)} />
<Socket on:node_deactivation={(e) => handleDeactivation(e.detail)} />
