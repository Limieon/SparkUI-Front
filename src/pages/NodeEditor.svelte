<script lang="ts">
	import { onMount } from 'svelte';
	import { workflow_old, workflow, node_data, type WorkflowNode } from '$lib/stores';
	import { v4 as uuidv4 } from 'uuid';

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

	let nodes = writable<any[]>([]);
	let edges = writable<any[]>([]);
	let availableNodes: { [key: string]: NodeMeta } = {};

	const NODE_ORIGIN = { x: 0, y: 0 };
	onMount(async () => {
		const data = await fetch(`http://${SPARKUI_BACK_HOST}/v1/nodes`);
		const json = await data.json();
		availableNodes = json.nodes;

		loadFromStore();

		nodes.subscribe(() => {
			saveIntoStore($nodes, $edges);
		});
		edges.subscribe(() => {
			saveIntoStore($nodes, $edges);
		});
	});

	function addNode(nodeType: string) {
		const temp = [...$nodes];
		const node = availableNodes[nodeType];

		const valStore = writable({});

		const id = uuidv4();
		temp.push({
			id: id,
			type: 'api_node',
			data: {
				nodeID: id,
				id: node.id,
				label: node.label,
				inputs: node.inputs,
				outputs: node.outputs,
				current: writable<boolean>(false),
				useProgress: node.use_progress,
				progressCurrent: writable<number>(0),
				progressMax: writable<number>(1),
				values: valStore
			},
			position: NODE_ORIGIN,
			dragHandle: '.dragHandle'
		});

		$nodes = [...temp];
	}

	function saveIntoStore(nodes: any[], edges: any[]) {
		let temp: { [key: string]: WorkflowNode } = {};

		console.log('Saving...', { nodes, edges });
		for (let n of nodes) {
			temp[n.id] = {
				id: n.id,
				inputParameters: {},
				type: n.data.id,
				pos: n.position
			};

			if ($node_data[n.id]) {
				for (let d of Object.keys($node_data[n.id])) {
					temp[n.id].inputParameters[d] = {
						type: 'value',
						value: $node_data[n.id][d]
					};
				}
			}

			for (let e of edges) {
				if (e.target === n.id) {
					temp[n.id].inputParameters[e.targetHandle] = {
						type: 'node',
						value: {
							node: e.source,
							handle: e.sourceHandle
						}
					};
				}
			}
		}

		console.log('Temp:', temp);
		$workflow = temp;
	}
	function loadFromStore() {
		console.log('Loading...', $workflow);
		for (let n of Object.keys($workflow)) {
			const node = $workflow[n];

			$nodes.push({
				id: `${node.id}`,
				type: 'api_node',
				data: {
					nodeID: `${node.id}`,
					id: node.type,
					label: availableNodes[node.type].label,
					inputs: availableNodes[node.type].inputs,
					outputs: availableNodes[node.type].outputs,
					current: writable<boolean>(false),
					useProgress: availableNodes[node.type].use_progress,
					progressCurrent: writable<number>(0),
					progressMax: writable<number>(1),
					values: writable({})
				},
				position: node.pos,
				dragHandle: '.dragHandle'
			});

			for (let p of Object.keys(node.inputParameters)) {
				const param = node.inputParameters[p];

				if (param.type === 'node' && param.value != undefined) {
					$edges.push({
						source: `${param.value.node}`,
						sourceHandle: `${param.value.handle}`,
						target: `${node.id}`,
						targetHandle: `${p}`,
						id: `xy-edge__${param.value.node}${param.value.handle}-${node.id}${p}`
					});
				}
			}
		}

		$nodes = $nodes;
		$edges = $edges;
	}

	function getNodeFromID(id: string) {
		for (let n of $nodes) {
			if (n.id === id) return n;
		}
	}

	const isValidConnection: IsValidConnection = (connection) => {
		try {
			if (!$nodes) return true;

			if (connection.source == connection.target) return false;

			const tgt = getNodeFromID(connection.target);
			const src = getNodeFromID(connection.source);

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
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(true);
				$nodes = $nodes;
			}
		});
	}
	function handleDeactivation(data: { node: string }) {
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
					body: JSON.stringify($workflow_old)
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
				{#each Object.keys(availableNodes) as nodeType}
					<Command.Item
						onSelect={() => {
							addNode(nodeType);
							selectorOpen = false;
						}}>{availableNodes[nodeType].label}</Command.Item
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
		snapGrid={[5, 5]}
		{nodeTypes}
		{isValidConnection}
		fitView
		on:nodeclick={(event) => console.log('on node click', event.detail.node)}
	>
		<MiniMap nodeColor="hsl(var(--primary))" position="top-right" />
		<Background
			patternColor="hsl(var(--foreground))"
			bgColor="hsl(var(--background-2))"
			variant={BackgroundVariant.Dots}
		/>
	</SvelteFlow>
</div>

<Socket on:node_progress={(e) => handleProgress(e.detail)} />
<Socket on:node_activation={(e) => handleActivation(e.detail)} />
<Socket on:node_deactivation={(e) => handleDeactivation(e.detail)} />
